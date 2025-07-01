import { Injectable } from '@nestjs/common';
import { IConfig } from '@interfaces/index';
import * as sql from 'mssql';
import * as fs from 'fs';
import { DataSource, createConnection, ConnectionOptions } from 'typeorm';
import { ConnectionDTO } from '@controllers/dto/connection.dto';

@Injectable()
export class  ConnectionService {
  private configPath = 'src/config/config.json';

  private dataSource: DataSource;

  async createDynamicConnection(config: ConnectionOptions) {
    this.dataSource = await createConnection(config);
  }

  async connect(data: ConnectionDTO) {
    console.log(data)
    let pool;
    try {
      pool = await sql.connect(data);
      fs.writeFileSync(this.configPath, JSON.stringify(data, null, 2));
      // return { success: true, message: 'Conexión exitosa a SQL Server' };
      return {
        mensaje: 'Conexión exitosa a SQL Server',
        descripcion: 'Conexión exitosa a SQL Server',
        resultado: data,
        success: true,
      };

    } catch (error) {
      throw new Error('Error al obtener la Conexion: ' + error.message);
    }
  }

  async destroyConnect(){
    fs.unlink(this.configPath, (err) => {
      if (err) {
        throw new Error('Error al destruir la Conexion' + err);
      }
      return { success: true, message: 'Conexión Destruida ExitosaMente' };
    });
  }
}
