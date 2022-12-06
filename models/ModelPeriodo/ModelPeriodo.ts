import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';
import { ModelPeriodoT } from '.';
import { ModelCargaPlan } from '../ModelCargaPlan';
export class ModelPeriodo extends Model<any, ModelPeriodoT> {}

ModelPeriodo.init(
	{
		id_periodo: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nombre: { type: DataTypes.INTEGER },
		estado: { type: DataTypes.CHAR },
	},
	{ sequelize, modelName: 'periodo', timestamps: false }
);

ModelPeriodo.hasMany(ModelCargaPlan, {
	foreignKey: 'id_periodo',
	sourceKey: 'id_periodo',
});
ModelCargaPlan.belongsTo(ModelPeriodo, {
	foreignKey: 'id_periodo',
	targetKey: 'id_periodo',
});
