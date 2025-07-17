import { Resolver, Query, Args } from '@nestjs/graphql';
import { ReportService } from './report.service';
import { Report } from './entities/report.entity';
import { ReportInfoInput, ReportInfoOutput } from './dto/report-info';
import { GeneralReportInfoOutput } from './dto/general-report-info.output';

@Resolver(() => Report)
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @Query(() => ReportInfoOutput, { name: 'checkHeader' })
  checkHeader(
    @Args('reportInfoInput', { type: () => ReportInfoInput })
    inputs: ReportInfoInput,
  ) {
    return this.reportService.checkHeader(inputs);
  }

  @Query(() => ReportInfoOutput, { name: 'checkReport' })
  checkReport(
    @Args('reportInfoInput', { type: () => ReportInfoInput })
    inputs: ReportInfoInput,
  ) {
    return this.reportService.checkReport(inputs);
  }
  @Query(() => ReportInfoOutput, { name: 'lastReport' })
  lastReport(
    @Args('reportInfoInput', { type: () => ReportInfoInput })
    inputs: ReportInfoInput,
  ) {
    return this.reportService.lastCheck(inputs);
  }

  @Query(() => GeneralReportInfoOutput, { name: 'report' })
  findOne(@Args('name', { type: () => String }) name: string) {
    return this.reportService.findOne(name);
  }
}
