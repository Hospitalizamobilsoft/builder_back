import { Injectable } from '@nestjs/common';
import conexion from '../../config/database';
import * as sql from 'mssql';
import { CreateFormDTO, InsertDataDTO, UpdateFormDTO } from '@controllers/dto/forms.dto';

@Injectable()
export class FormsService {
    async getForms() {
        try {
            const conn = await conexion.getConnection('forms');
            const pool = conn;
            const result = await pool.request();
            
            result.input('Accion', sql.VarChar(50), 'listar');
            const resultado = await result.execute('usp_ManageFormWithFields');
            
            return {
                mensaje: 'Procedimiento ejecutado correctamente',
                descripcion: 'Formularios listados exitosamente',
                resultado: resultado.recordsets,
                status: true,
            };
        } catch (error) {
            console.error('Error al listar formularios:', error);
            return {
                mensaje: 'Error al listar formularios',
                descripcion: error.message,
                resultado: null,
                status: false,
            };
        }
    }

    async getFormById(id: number) {
        try {
            const conn = await conexion.getConnection('forms');
            const pool = conn;
            const result = await pool.request();
            
            result.input('accion', sql.VarChar(50), 'listar_por_id');
            result.input('FormID', sql.Int, id);
            const resultado = await result.execute('usp_ManageFormWithFields');
            
            return {    
                mensaje: 'Procedimiento ejecutado correctamente',
                descripcion: 'Formulario listado exitosamente',
                resultado: resultado.recordsets,
                status: true,
            };
        } catch (error) {
            console.error('Error al listar formularios:', error);
            return {
                mensaje: 'Error al listar formularios',
                descripcion: error.message,
                resultado: null,
                status: false,
            };
        }
    }
    
    async createForm(createFormDTO: CreateFormDTO) {
        try {
            const conn = await conexion.getConnection('forms');
            const pool = conn;
            const result = await pool.request();
    
            console.log("createFormDTO",createFormDTO)
            console.log("createFormDTO.fields",createFormDTO.fields)
            // Parámetros principales del formulario
            result.input('Id', sql.Int, createFormDTO.id);
            result.input('FormName', sql.VarChar(255), createFormDTO.form_name);
            result.input('FormDescription', sql.VarChar(sql.MAX), createFormDTO.form_description || null);
            result.input('Data_json', sql.VarChar(sql.MAX), createFormDTO.dataJson || null);
            result.input('Table_name', sql.VarChar(255), createFormDTO.table_name || null);
    
            // Crear TVP para los campos del formulario
            const tvpFields = new sql.Table();
            tvpFields.columns.add('field_internal_id', sql.VarChar(50));
            tvpFields.columns.add('column_name', sql.VarChar(255));
            tvpFields.columns.add('label', sql.VarChar(255));
            tvpFields.columns.add('data_type', sql.VarChar(50));
            tvpFields.columns.add('is_nullable', sql.Bit);
            tvpFields.columns.add('is_primary_key', sql.Bit);
            tvpFields.columns.add('is_foreign_key', sql.Bit);
            tvpFields.columns.add('reference_table', sql.VarChar(255));
            tvpFields.columns.add('reference_column', sql.VarChar(255));
            tvpFields.columns.add('field_order', sql.Int);
            // tvpFields.columns.add('options', sql.VarChar(sql.MAX));
            tvpFields.columns.add('default_value', sql.VarChar(sql.MAX));
            tvpFields.columns.add('cols', sql.Int);
    
            // Llenar la TVP con los campos
            createFormDTO.fields.forEach(field => {
                tvpFields.rows.add(
                    field.field_internal_id,
                    field.column_name,
                    field.label,
                    field.data_type,
                    field.is_nullable ? 1 : 0, // ✅ Convertir booleano o número a BIT
                    field.is_primary_key ? 1 : 0, // ✅ Convertir a BIT
                    field.is_foreign_key ? 1 : 0, // ✅ Convertir a BIT
                    field.reference_table || null,
                    field.reference_column || null,
                    field.field_order,
                    field.default_value || null,
                    field.cols || null 
                );
            });
    
            result.input('FormFields', tvpFields);
            result.input('accion', sql.VarChar(50), 'guardar'); // Ajustado a inglés
    
            const resultado = await result.execute('usp_ManageFormWithFields');
    
            return {
                message: 'Procedure executed successfully',
                description: 'Form created successfully',
                result: resultado.recordsets,
                status: true,
            };
        } catch (error) {
            console.error('Error creating form:', error);
            return {
                message: 'Error creating form',
                description: error.message,
                result: null,
                status: false,
            };
        }
    }

    async getFormByTable(table_name: string) {
        try {
            const conn = await conexion.getConnection('forms');
            const pool = conn;
            const result = await pool.request();
            
            result.input('accion', sql.VarChar(250), 'listar_forms_by_table_name');
            result.input('Table_name', sql.VarChar(255), table_name);
            const resultado = await result.execute('usp_ManageFormWithFields');
            
            return {    
                mensaje: 'Procedimiento ejecutado correctamente',
                descripcion: 'Formulario listado exitosamente',
                resultado: resultado.recordsets,
                status: true,
            };
        } catch (error) {
            console.error('Error al listar formularios:', error);
            return {
                mensaje: 'Error al listar formularios',
                descripcion: error.message,
                resultado: null,
                status: false,
            };
        }
    }

    async insertData(insertDataDTO: InsertDataDTO) {
        console.log("insertDataDTO", insertDataDTO);
        try {
            const conn = await conexion.getConnection('forms');
            const pool = conn;
            const result = await pool.request();

            // Parámetros principales del formulario
            result.input('table_name', sql.VarChar(255), insertDataDTO.table_name);
            result.input('idRow', sql.Int, insertDataDTO.idRow);
            // result.input('json_data', sql.VarChar(sql.MAX), JSON.stringify(insertDataDTO.json_data));
            console.log("JSON.stringify([insertDataDTO.json_data])", JSON.stringify([insertDataDTO.json_data]));
            result.input('json_data', sql.VarChar(sql.MAX), JSON.stringify([insertDataDTO.json_data]));
            result.input('accion', sql.VarChar(50), 'guardar');

            const resultado = await result.execute('sp_guardar_dinamico');
            
            return {
                mensaje: 'Procedimiento ejecutado correctamente',
                descripcion: 'Formulario insertado exitosamente',
                resultado: resultado.recordsets,
                status: true,
            };
        } catch (error) {
            console.error('Error al insertar formulario:', error);
            return {
                mensaje: 'Error al insertar formulario',
                descripcion: error.message,
                resultado: null,
                status: false,
            };
        }
    }

    async getDataFromTable(table_name: string) {
        console.log("table_name", table_name);
        try {
            const conn = await conexion.getConnection('forms');
            const pool = conn;
            const result = await pool.request();

            // Parámetros principales del formulario
            result.input('table_name', sql.VarChar(255), table_name);
            result.input('accion', sql.VarChar(50), 'listar_por_tabla_nombre');

            const resultado = await result.execute('sp_guardar_dinamico');
            
            return {
                mensaje: 'Procedimiento ejecutado correctamente',
                descripcion: 'Formulario listado exitosamente',
                resultado: resultado.recordsets,
                status: true,
            };
        } catch (error) {
            console.error('Error al listar formulario:', error);
            return {
                mensaje: 'Error al listar formulario',
                descripcion: error.message,
                resultado: null,
                status: false,
            };
        }
    }

    async deleteData(insertDataDTO: InsertDataDTO) {
        console.log("insertDataDTO", insertDataDTO);
        try {
            const conn = await conexion.getConnection('forms');
            const pool = conn;
            const result = await pool.request();

            // Parámetros principales del formulario
            result.input('table_name', sql.VarChar(255), insertDataDTO.table_name);
            result.input('idRow', sql.Int, insertDataDTO.idRow);
            result.input('accion', sql.VarChar(50), 'eliminar');

            const resultado = await result.execute('sp_guardar_dinamico');
            
            return {
                mensaje: 'Procedimiento ejecutado correctamente',
                descripcion: 'Formulario eliminado exitosamente',
                resultado: resultado.recordsets,
                status: true,
            };
        } catch (error) {
            console.error('Error al eliminar formulario:', error);
            return {
                mensaje: 'Error al eliminar formulario',
                descripcion: error.message,
                resultado: null,
                status: false,
            };
        }
    }
}