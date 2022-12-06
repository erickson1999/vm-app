import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';
import { ModelFacultadT } from '.';
import { ModelEscuela } from '../ModelEscuela';
import { ModelCargaPlan } from '../ModelCargaPlan';

export class ModelFacultad extends Model<any, ModelFacultadT> {}

ModelFacultad.init(
	{
		id_facultad: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nombre: { type: DataTypes.CHAR(50) },
		estado: { type: DataTypes.CHAR },
		alias: { type: DataTypes.CHAR(30) },
	},
	{ sequelize, modelName: 'facultad', timestamps: false }
);

ModelFacultad.hasMany(ModelCargaPlan, {
	foreignKey: 'id_facultad',
	sourceKey: 'id_facultad',
});
ModelCargaPlan.belongsTo(ModelFacultad, {
	foreignKey: 'id_facultad',
	targetKey: 'id_facultad',
});
