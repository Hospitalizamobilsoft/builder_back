import { Controller, Get, Param, Post, Body, OnModuleDestroy } from '@nestjs/common';
import { DatabaseService } from './database.service';


@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}


  // Obtener todas las tablas
  @Get('tables')
  async getTables() {
    return await this.databaseService.getTables();
  }

  // Obtener estructura de una tabla
  @Get('table/:tableName')
  async getTableStructure(@Param('tableName') tableName: string) {
    return await this.databaseService.getTableStructure(tableName);
  }
}
