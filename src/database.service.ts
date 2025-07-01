import { Injectable } from '@nestjs/common';
import { DataSource, createConnection, ConnectionOptions } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(private dataSource: DataSource) {}

  async createDynamicConnection(config: ConnectionOptions) {
    this.dataSource = await createConnection(config);
  }

  // Obtener todas las tablas de la base de datos
  async getTables() {
    try {
      const query = `
        SELECT TABLE_NAME 
        FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_TYPE = 'BASE TABLE'
      `;
      const result = await this.dataSource.query(query);
      console.log(result);
      console.log(result.map(row => row.TABLE_NAME));

      return result.map(row => row.TABLE_NAME);
    } catch (error) {
      throw new Error('Error al obtener las tablas: ' + error.message);
    }
  }

  // Obtener la estructura de una tabla específica
  async getTableStructure(tableName: string) {
    try {
      const query = `
        SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = @0
      `;
      const result = await this.dataSource.query(query, [tableName]);
      return result;
    } catch (error) {
      throw new Error('Error al obtener la estructura de la tabla: ' + error.message);
    }
  }
}
