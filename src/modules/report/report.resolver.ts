import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReportService } from './report.service';
import { Report } from './entities/report.entity';
import { CreateReportInput } from './dto/create-report.input';
import { UpdateReportInput } from './dto/update-report.input';
import { CheckHeaderInput } from '../header/dto/check-header.input';
import { CheckHeaderOutput } from '../header/dto/check-header.output';

@Resolver(() => Report)
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @Mutation(() => Report)
  createReport(
    @Args('createReportInput') createReportInput: CreateReportInput,
  ) {
    return this.reportService.create(createReportInput);
  }

  @Query(() => CheckHeaderOutput, { name: 'checkHeader' })
  checkHeader(
    @Args('checkHeaderInputs', { type: () => CheckHeaderInput })
    inputs: CheckHeaderInput,
  ) {
    return this.reportService.checkHeader(inputs);
  }

  @Query(() => [Report], { name: 'reports' })
  findAll() {
    return this.reportService.findAll();
  }

  @Query(() => Report, { name: 'report' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reportService.findOne(id);
  }

  @Mutation(() => Report)
  updateReport(
    @Args('updateReportInput') updateReportInput: UpdateReportInput,
  ) {
    return this.reportService.update(updateReportInput.id, updateReportInput);
  }

  @Mutation(() => Report)
  removeReport(@Args('id', { type: () => Int }) id: number) {
    return this.reportService.remove(id);
  }
}
