import { Controller, Get, Param } from '@nestjs/common';
import { DatabaseService } from '@services/database/database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  // Obtener todas las tablas
  @Get('tables')
  async getTables() {
    return await this.databaseService.getTables();
  }

  // Obtener estructura de una tabla
  @Get('table/:databaseName/:tableName')
  async getTableStructure(@Param('databaseName') databaseName: string, @Param('tableName') tableName: string) {
    return await this.databaseService.getTableStructure(databaseName, tableName);
  }
}
