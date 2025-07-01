import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";

export class ConnectionDTO {

    @ApiProperty({ description: 'ID del nivel educativo' })
    @IsNotEmpty()
    @IsString()
    server: string;

    @ApiProperty({ description: 'Institución educativa' })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    database?: string;

    @ApiProperty({ description: 'Título obtenido' })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    user?: string;

    @ApiProperty({ description: 'Fecha de graduación' })
    @IsOptional()
    @IsString()
    password?: string;

    @ApiProperty({ description: 'Fecha de graduación' })
    @IsOptional()
    @IsInt()
    port?: number;

    @ApiProperty({ description: 'Fecha de graduación' })
    @IsOptional()
    options?: any;
}

