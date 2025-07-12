import { Injectable } from '@nestjs/common';
import { CreateReportInput } from './dto/create-report.input';
import { UpdateReportInput } from './dto/update-report.input';
import { InjectModel } from '@nestjs/mongoose';
import { Report } from './report.schema';
import { promises as fs } from 'fs';
import * as path from 'path';
import { Model } from 'mongoose';
import { CheckHeaderInput } from '../header/dto/check-header.input';
import {
  CheckHeaderOutput,
  HeaderInfo,
} from '../header/dto/check-header.output';
import Fuse from 'fuse.js';

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
    checkHeader: CheckHeaderInput,
  ): Promise<CheckHeaderOutput | null> {
    const report = await this.reportModel
      .findOne({ name: checkHeader.report })
      .exec();

    if (!report) {
      throw new Error('Report not found');
    }

    // Extract headers from report
    const headers = report.headers;

    // Map each header's checkMap.ar
    const headersCheckMapAr = headers.map((header) => header.checkMap.ar);
    const headersCheckMapEn = headers.map((header) => header.checkMap.en);
    const englishRegex = /^[A-Za-z\s]+$/;
    const isEnglsh = englishRegex.test(checkHeader.headers[0]);
    const headersCheckMap = isEnglsh ? headersCheckMapEn : headersCheckMapAr;
    const headerInfo = checkHeader.headers.map((sentHeader) => {
      const flatList = headersCheckMap.flatMap((entry) =>
        entry.Expectations.map((expect) => ({
          expect,
          correct: entry.correct,
        })),
      );

      const fuse = new Fuse(flatList, {
        keys: ['expect'],
        threshold: 0.4,
        includeScore: true,
      });

      // Perform search
      const value = sentHeader
        .replace(/[{}\\[\]()\\/\\.,!?؛:<>%&*'"«»\-_=+|^$#@~]/g, '')
        .trim();
      const result = fuse.search(value);

      // Calculate Score from 0 -> 100
      const score = Math.floor(100 - (result[0].score ?? 0) * 100);
      //Check result
      const checkHeaderOutput: HeaderInfo = {
        sentHeader: sentHeader,
        expectedHeader: '',
        score: score,
      };
      if (result.length > 0) {
        checkHeaderOutput.expectedHeader = result[0].item.correct;
      }
      return checkHeaderOutput;
    });
    return {
      headersInfo: headerInfo,
      allHeaders: headersCheckMap.map((header) => header.correct),
    };
  }

  create(createReportInput: CreateReportInput) {
    return 'This action adds a new report';
  }

  findAll() {
    return `This action returns all report`;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportInput: UpdateReportInput) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
