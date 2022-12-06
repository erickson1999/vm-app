import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';
import { ModelEscuelaT } from '.';
import { ModelEscuela_sucursal } from '../ModelEscuela_sucursal';
import { ModelCargaPlan } from '../ModelCargaPlan';

export class ModelEscuela extends Model<any, ModelEscuelaT> {}

ModelEscuela.init(
	{
		id_escuela: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nombre: { type: DataTypes.CHAR(50) },
		estado: { type: DataTypes.CHAR },
	},
	{ sequelize, modelName: 'escuela', timestamps: false }
);

ModelEscuela.hasMany(ModelCargaPlan, {
	foreignKey: 'id_escuela',
	sourceKey: 'id_escuela',
});

ModelCargaPlan.belongsTo(ModelEscuela, {
	foreignKey: 'id_escuela',
	targetKey: 'id_escuela',
});
