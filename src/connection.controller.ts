import { ApiTags } from '@nestjs/swagger';
import { DataSource, createConnection, ConnectionOptions } from 'typeorm';

import { Controller, Get, Param, Post, Body, OnModuleDestroy } from '@nestjs/common';


@ApiTags('connection-main')
@Controller('connection')
export class ConnectionController {
  constructor(private dataSource: DataSource) {}ç
  
  async createDynamicConnection(config: ConnectionOptions) {
    this.dataSource = await createConnection(config);
  }


  @Get()
  async testConnection() {
    try {
      await this.dataSource.query('SELECT 1');
      return { success: true, message: 'Conexión exitosa a SQL Server' };
    } catch (error) {
      return { success: false, message: 'Error en la conexión', error: error.message };
    }
  }
}
