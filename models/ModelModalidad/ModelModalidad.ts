import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';
import { ModelModalidadT } from '.';
import { ModelCargaPlan } from '../ModelCargaPlan';

export class ModelModalidad extends Model<any, ModelModalidadT> {}

ModelModalidad.init(
	{
		id_modalidad: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nombre: { type: DataTypes.CHAR(50)},
	    estado: { type: DataTypes.CHAR(10) },
	},
	{ sequelize, modelName: 'modalidad', timestamps:false }
);

ModelModalidad.hasMany(ModelCargaPlan,{
	foreignKey: 'id_modalidad',
	sourceKey: 'id_modalidad'
})
ModelCargaPlan.belongsTo(ModelModalidad,{
	foreignKey: 'id_modalidad',
	targetKey: 'id_modalidad'
})

