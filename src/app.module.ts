import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { graphqlConfig } from './config/graphql.config';
import { databaseConfig } from './config/database.config';
import { ReportResolver } from './modules/report/report.resolver';
import { ReportModule } from './modules/report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env
    GraphQLModule.forRoot(graphqlConfig),
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync(databaseConfig),
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
