import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

class FormFieldDTO {
  @ApiProperty({ description: 'Internal field ID' })
  @IsNotEmpty()
  @IsString()
  field_internal_id: string;

  @ApiProperty({ description: 'Database column name' })
  @IsNotEmpty()
  @IsString()
  column_name: string;

  @ApiProperty({ description: 'Field label' })
  @IsNotEmpty()
  @IsString()
  label: string;

  @ApiProperty({ description: 'Field data type' })
  @IsNotEmpty()
  @IsString()
  data_type: string;

  @ApiProperty({ description: 'Indicates if the field can be null', enum: ['Yes', 'No'] })
  @IsNotEmpty()
  is_nullable: number;

  @ApiProperty({ description: 'Indicates if this is a primary key', enum: ['Yes', 'No'] })
  @IsNotEmpty()
  is_primary_key: number;

  @ApiProperty({ description: 'Indicates if this is a foreign key', enum: ['Yes', 'No'] })
  @IsNotEmpty()
  is_foreign_key: number;

  @ApiProperty({ description: 'Reference table (if foreign key)', required: false })
  @IsOptional()
  @IsString()
  reference_table?: string | null;

  @ApiProperty({ description: 'Reference column (if foreign key)', required: false })
  @IsOptional()
  @IsString()
  reference_column?: string | null;
 
  @ApiProperty({ description: 'Field order in the form' })
  @IsNotEmpty()
  field_order: number;

  @ApiProperty({ description: 'Default field value' })
  @IsOptional()
  @IsString()
  default_value?: string | null;

  @ApiProperty({ description: 'Field order in the form' })
  @IsNotEmpty()
  cols?: number | null;
}

export class FormDTO {
  @ApiProperty({ description: 'Form name' })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({ description: 'Form name' })
  @IsString()
  form_name: string;

  @ApiProperty({ description: 'Form description', required: false })
  @IsOptional()
  @IsString()
  form_description?: string;

  @ApiProperty({ description: 'Form JSON data', required: false })
  @IsOptional()
  @IsString()
  dataJson?: string;

  @ApiProperty({ description: 'Table name', required: false })
  @IsOptional()
  @IsString()
  table_name?: string;

  @ApiProperty({ description: 'Form fields', type: [FormFieldDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FormFieldDTO)
  fields: FormFieldDTO[];
}

export class CreateFormDTO extends FormDTO {}

export class UpdateFormDTO extends FormDTO {
  @ApiProperty({ description: 'ID of the form to update' })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class InsertDataDTO {

  @ApiProperty({ description: 'ID of the form to insert data' })
  @IsNotEmpty()
  @IsNumber()
  idRow: number;

  @ApiProperty({ description: 'Table Name' })
  @IsNotEmpty()
  @IsString()
  table_name: string;

  @ApiProperty({ description: 'JSON Data' })
  @IsNotEmpty()
  json_data: any;
}
