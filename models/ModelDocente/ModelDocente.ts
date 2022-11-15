import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';
import {ModelDocenteT } from '.';

export class ModelDocente extends Model<any, ModelDocenteT> {}

ModelDocente.init(
	{
		id_persona: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		codigo: { type: DataTypes.INTEGER},
	    
	},
	{ sequelize, modelName: 'docente', timestamps:false },
);
