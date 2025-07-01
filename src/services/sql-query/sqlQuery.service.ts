import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import * as fs from 'fs';
import { IConfig } from '@interfaces/config.interface';

@Injectable()
export class SqlQueryService {
  private configPath = 'src/config/config.json';
  
  async executeQuery(query: string) {
    let pool;
    try {
      if (!fs.existsSync(this.configPath)) throw 'Parametros de conexion ala BD no encontrada.';
      const config_DB = JSON.parse(fs.readFileSync(this.configPath, 'utf-8'));
      pool = await sql.connect(config_DB);
      const result = await pool.request().query(query);
      return result.recordset;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    } finally {
      if (pool) {
        await pool.close();
      }
    }
  }

  async executeStoredProcedure(procedureName: string, params: any) {
    let pool;
    try {
      if (!fs.existsSync(this.configPath)) throw 'Parametros de conexion ala BD no encontrada.';
      const config_DB =  await fs.readFileSync(this.configPath, 'utf-8');
      pool = await sql.connect(config_DB);
      const request = pool.request();
      this.addParameters(request, params);
      const result = await request.execute(procedureName);
      return result.recordset;
    } catch (error) {
      console.error('Error executing stored procedure:', error);
      throw error;
    } finally {
      if (pool) {
        pool.close();
      }
    }
  }

  private addParameters(request: any, params: any) {
    Object.keys(params).forEach((key) => {
      const { value, type } = params[key];
      switch (type) {
        case 'nvarchar':
          request.input(key, sql.NVarChar, value);
          break;
        case 'datetime':
          request.input(key, sql.DateTime, value);
          break;
        case 'bit':
          request.input(key, sql.Bit, value ? 1 : 0);
          break;
        case 'numeric':
          request.input(key, sql.Numeric(18, 2), value);
          break;
        case 'float':
          request.input(key, sql.Float, value);
          break;
        case 'char':
          request.input(key, sql.Char, value);
          break;
        case 'varchar':
          request.input(key, sql.VarChar, value);
          break;
        default:
          request.input(key, sql.NVarChar, value);
      }
    });
  }
}
