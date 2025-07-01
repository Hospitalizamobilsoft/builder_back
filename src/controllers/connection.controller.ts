import { IConfig } from '@interfaces/index';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConnectionService } from '@services/connection/connection.service';
import { ConnectionDTO } from './dto/connection.dto'
import { ApiTags } from '@nestjs/swagger';
import { ConnectionOptions } from 'typeorm';

@Controller('connection-main')
export class ConnectionController {

  constructor(
    private readonly connectionService: ConnectionService
  ) { }

  @Post()
  async create(@Body() data: ConnectionDTO) {
    const body = { ...data, options: { encrypt: false, port: 1433 } }
    return await this.connectionService.connect(body);
  }

  // @Post('connect')
  // //data: ConnectionDTO
  // async connect(@Body() config: ConnectionOptions) {
  //   await this.connectionService.createDynamicConnection(config);
  //   return { message: 'Conexión establecida correctamente.' };
  // }

  @Get('destroy')
  async destroyConnect() {
    return await this.connectionService.destroyConnect();
  }


}
