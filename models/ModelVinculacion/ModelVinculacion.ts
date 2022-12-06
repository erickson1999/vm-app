import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';
import { ModelVinculacionT } from '.';
import { ModelPlan_medio } from '../ModelPlan_medio';
import { ModelCargaPlan } from '../ModelCargaPlan';

export class ModelVinculacion extends Model<any, ModelVinculacionT> {}

ModelVinculacion.init(
	{
		id_vinculacion: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nombre: { type: DataTypes.CHAR(50) },
		detalle: { type: DataTypes.CHAR },
		tipo: { type: DataTypes.CHAR },
		archivo: { type: DataTypes.CHAR },
		estado: { type: DataTypes.CHAR },
	},
	{ sequelize, modelName: 'vinculacion', timestamps: false }
);

ModelVinculacion.hasMany(ModelCargaPlan, {
	foreignKey: 'id_vinculacion',
	sourceKey: 'id_vinculacion',
});
ModelCargaPlan.belongsTo(ModelVinculacion, {
	foreignKey: 'id_vinculacion',
	targetKey: 'id_vinculacion',
});
