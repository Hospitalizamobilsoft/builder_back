import { Injectable } from '@nestjs/common';
import { SqlQueryService } from '@services/sql-query/sqlQuery.service';
import * as fs from 'fs';
import * as sql from 'mssql';

@Injectable()
export class DatabaseService {
  constructor(private readonly sqlQueryService: SqlQueryService) { }
  private configPath = 'src/config/config.json';

  async executeQuery(query: string, params: Record<string, any> = {}) {
    let pool: sql.ConnectionPool;
    try {
        if (!fs.existsSync(this.configPath)) throw 'Parametros de conexion ala BD no encontrada.';
        const config_DB = JSON.parse(fs.readFileSync(this.configPath, 'utf-8'));
        pool = await sql.connect(config_DB);
        const request = pool.request();

        // Agregar parámetros a la solicitud
        for (const paramName in params) {
            request.input(paramName, params[paramName]);
        }

        const result = await request.query(query);
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

  async getTables() {
    try {
        const query = `
            SELECT *
            FROM 
                View_Diccionario_Datos -- Reemplaza MiVistaTablas con el nombre de tu vista
            ORDER BY 
                tableName ASC;
        `;

        const result = await this.sqlQueryService.executeQuery(query);

        return {
            mensaje: 'Se listo correctamente las tablas desde la vista',
            descripcion: 'Se listo correctamente las tablas desde la vista',
            resultado: result.map(row => row),
            status: true,
        };
    } catch (error) {
        throw new Error('Error al obtener las tablas desde la vista: ' + error.message);
    }
}

  async getTableStructure(databaseName: string, tableName: string) {
  try {
      const query = `
          DECLARE @return_value INT;

          EXEC @return_value = [dbo].[ObtenerDiccionarioDatos]
              @NombreBaseDatos = @databaseName,
              @tablename = @tableName;

          SELECT 'Return Value' = @return_value;
      `;

      const params = {
          databaseName: databaseName,
          tableName: tableName
      };

      const result = await this.executeQuery(query, params);

      return {
          mensaje: 'Estructura de la tabla obtenida correctamente',
          descripcion: 'Se obtuvo la estructura de la tabla utilizando el procedimiento almacenado ObtenerDiccionarioDatos',
          resultado: result,
          status: true,
      };
  } catch (error) {
      throw new Error('Error al obtener la estructura de la tabla: ' + error.message);
  }
}
}
