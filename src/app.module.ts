import { ConnectionController } from '@controllers/connection.controller';
import { DatabaseController } from '@controllers/database.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  ConnectionService
} from '@services/connection/connection.service';
import {
  DatabaseService
} from '@services/database/database.service';
import {
  SqlQueryService
} from '@services/sql-query/sqlQuery.service';
import { FormsService } from './services/forms/forms.service';
import { FormsController } from './controllers/forms.controller';

@Module({
  imports: [
    ConfigModule.forRoot()
  ],
  controllers: [DatabaseController, ConnectionController, FormsController],
  providers: [SqlQueryService, DatabaseService, ConnectionService, FormsService],
})
export class AppModule { }
