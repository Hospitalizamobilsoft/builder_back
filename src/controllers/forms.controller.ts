import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { FormsService } from '@services/forms/forms.service';
import { CreateFormDTO, InsertDataDTO } from './dto/forms.dto';

@Controller('forms')
export class FormsController {
    constructor(private readonly formsService: FormsService) {}

  // Obtener todas las tablas
  @Get()
  async getForms() {
    return await this.formsService.getForms();
  }

  @Get(':id')
  async getFormById(@Param('id') id: number) {
    return await this.formsService.getFormById(id);
  }

  @Get('table/:table_name')
  async getFormByTable(@Param('table_name') table_name: string) {
    return await this.formsService.getFormByTable(table_name);
  }

  @Post()
  async createForm(@Body() createFormDTO: CreateFormDTO) {
    return await this.formsService.createForm(createFormDTO);
  }

  @Post('insertData')
  async insertData(@Body() insertDataDTO: InsertDataDTO) {
    return await this.formsService.insertData(insertDataDTO);
  }

  @Post('deleteData')
  async deleteData(@Body() deleteDataDTO: InsertDataDTO) {
    return await this.formsService.deleteData(deleteDataDTO);
  }

  @Get('table-records/:table_name')
  async getDataFromTable(@Param('table_name') table_name: string) {
    return await this.formsService.getDataFromTable(table_name);
  }
}
