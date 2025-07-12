// src/config/database.config.ts
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule], // Enable ConfigService
  useFactory: (config: ConfigService) => ({
    uri: config.get<string>('DATABASE_URL'), // Read from .env
    retryAttempts: 3,
    retryDelay: 1000,
  }),
  inject: [ConfigService], // Inject ConfigService
};
