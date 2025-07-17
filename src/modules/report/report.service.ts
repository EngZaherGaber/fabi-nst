import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Report } from './report.schema';
import { promises as fs } from 'fs';
import * as path from 'path';
import { Model } from 'mongoose';
import Fuse from 'fuse.js';
import { ReportInfoInput, ReportInfoOutput } from './dto/report-info';
import { GeneralReportInfoOutput } from './dto/general-report-info.output';
import { HeaderInfoBase } from '../header/dto/header-info';

@Injectable()
export class ReportService {
  constructor(@InjectModel(Report.name) private reportModel: Model<Report>) {}

  async onModuleInit() {
    const count = await this.reportModel.countDocuments();
    if (count === 0) {
      console.log('No reports found, inserting default data...');
      await this.insertDefaultReports();
    }
  }

  private async insertDefaultReports() {
    try {
      const filePath = path.join(
        __dirname,
        '..',
        '..',
        'assets',
        'reports.json',
      );
      console.log('Loading from:', filePath);
      const fileData = await fs.readFile(filePath, 'utf-8');
      const defaultReport = JSON.parse(fileData);
      await this.reportModel.create(defaultReport);
      console.log('Default reports inserted successfully.');
    } catch (error) {
      console.error('Error reading or inserting default reports:', error);
    }
  }

  async checkHeader(
    reportInfo: ReportInfoInput,
  ): Promise<ReportInfoOutput | null> {
    const report = await this.reportModel
      .findOne({ name: reportInfo.reportName })
      .exec();

    if (!report) {
      throw new Error('Report not found');
    }

    // Extract headers from report
    const headers = report.headers;

    // Map each header's checkMap.ar
    const englishRegex = /^[A-Za-z\s]+$/;
    const isEnglsh = englishRegex.test(reportInfo.headers[0].sentHeader);
    const headersCheckMap = headers.map((header) => header.checkMap);
    const headerInfo = reportInfo.headers.map((h) => {
      const flatList = headersCheckMap.flatMap((entry) => {
        return {
          ...(isEnglsh ? entry.en : entry.ar),
          final: entry.final,
        };
      });

      const fuse = new Fuse(flatList, {
        keys: ['Expectations'],
        threshold: 0.4,
        includeScore: true,
      });

      // Perform search
      const value = h.sentHeader
        .replace(/[{}\\[\]()\\/\\.,!?؛:<>%&*'"«»\-_=+|^$#@~]/g, '')
        .trim();
      const result = fuse.search(value);

      // Calculate Score from 0 -> 100
      const score =
        result.length > 0 ? Math.floor(100 - (result[0].score ?? 0) * 100) : 0;

      let status: string = '';
      if (score < 75) {
        status = 'Unknown';
      }
      //Check result
      h.score = score;
      h.status = status;
      if (result.length > 0) {
        h.expectedHeader = result[0].item.correct;
        h.final = result[0].item.final;
      }
      return h;
    });
    this.hasDuplicatesByProperty(headerInfo, 'final');
    headerInfo.map((h) => {
      if (h.status.length === 0) {
        h.status = 'Expected';
      }
      return h;
    });
    reportInfo.headers = headerInfo;
    return reportInfo;
  }

  private hasDuplicatesByProperty<T>(array: any[], prop: string) {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (element[prop] && element.status !== 'Unknown') {
        const count = array.filter((el) => el[prop] === element[prop]).length;
        if (count > 1) {
          element.status = 'Duplicated';
        }
      }
    }
  }

  async findOne(name: string): Promise<GeneralReportInfoOutput | null> {
    const report = await this.reportModel.findOne({ name: name }).exec();
    if (report) {
      return {
        reportName: name,
        isDynamic: report.isDynamic,
        headerCount: report.headers.length,
        allHeaders: report.headers.map((x) => x.checkMap.final),
      };
    }
    return null;
  }

  async checkReport(
    reportInfo: ReportInfoInput,
  ): Promise<ReportInfoOutput | null> {
    const report = await this.reportModel
      .findOne({ name: reportInfo.reportName })
      .exec();
    const validHeaders = reportInfo.headers;
    if (report) {
      const requiredHeaders = report.headers
        .filter((h) => h.required)
        .map((h) => h.checkMap.final);

      const allRequiredNotFound = requiredHeaders
        .filter((requiredHeader) => {
          const foundHeader = validHeaders.find(
            (validHeader) => validHeader.final === requiredHeader,
          );
          return !foundHeader;
        })
        .forEach((h) => {
          reportInfo.headers.push({
            final: h,
            sentHeader: '',
            expectedHeader: '',
            score: 0,
            choiceHeader: '',
            status: 'Missed',
            isDynamic: false,
          });
        });
      reportInfo.headers = reportInfo.headers.map((h) => {
        return { ...h, status: h.status === 'Missed' ? h.status : 'Valid' };
      });
      return reportInfo;
    }
    return null;
  }

  async lastCheck(
    reportInfo: ReportInfoInput,
  ): Promise<ReportInfoOutput | null> {
    const report = await this.reportModel
      .findOne({ name: reportInfo.reportName })
      .exec();

    const lastHeaders = reportInfo.headers;

    if (report) {
      reportInfo.headers = await Promise.all(
        lastHeaders.map(async (h) => {
          const englishRegex = /^[A-Za-z\s]+$/;
          const isEnglish = englishRegex.test(h.sentHeader);

          if (report.isDynamic) {
            if (!h.isDynamic) {
              await this.addNewExpectationHeader(report, h, isEnglish);
            } else {
              const header = {
                required: false,
                expectedType: 'string',
                checkMap: {
                  ar: !isEnglish
                    ? { Expectations: [h.sentHeader], correct: h.sentHeader }
                    : { Expectations: [], correct: '' },
                  en: isEnglish
                    ? { Expectations: [h.sentHeader], correct: h.sentHeader }
                    : { Expectations: [], correct: '' },
                  final: h.sentHeader,
                },
              };
              await this.reportModel.findOneAndUpdate(
                {
                  name: reportInfo.reportName,
                },
                {
                  $push: { headers: header },
                },
                { new: true },
              );
            }
          } else {
            await this.addNewExpectationHeader(report, h, isEnglish);
          }

          h.status = 'Checked';
          return h;
        }),
      );
    }

    return reportInfo;
  }

  private async addNewExpectationHeader(
    report: Report,
    h: HeaderInfoBase,
    isEnglish: boolean,
  ) {
    const foundHeaderByFinal = report.headers.find(
      (reportHeader) => reportHeader.checkMap.final === h.final,
    );
    if (foundHeaderByFinal) {
      const arrayExpectationLanguage = isEnglish
        ? foundHeaderByFinal.checkMap.en.Expectations
        : foundHeaderByFinal.checkMap.ar.Expectations;
      if (!arrayExpectationLanguage.find((ex) => ex === h.sentHeader)) {
        arrayExpectationLanguage.push(h.sentHeader);
        if (isEnglish) {
          await this.reportModel.findOneAndUpdate(
            {
              name: report.name,
            },
            {
              $set: {
                'headers.$[elem].checkMap.en.Expectations':
                  arrayExpectationLanguage,
              },
            },
            {
              arrayFilters: [{ 'elem.checkMap.final': h.final }],
              returnDocument: 'after', // or `new: true` in older versions
            },
          );
        } else {
          await this.reportModel.findOneAndUpdate(
            {
              name: report.name,
            },
            {
              $set: {
                'headers.$[elem].checkMap.ar.Expectations':
                  arrayExpectationLanguage,
              },
            },
            {
              arrayFilters: [{ 'elem.checkMap.final': h.final }],
              returnDocument: 'after', // or `new: true` in older versions
            },
          );
        }
      }
    }
  }
}
