import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';
import { ModelDocenteT } from '.';
import { ModelCargaPlan } from '../ModelCargaPlan';

export class ModelDocente extends Model<any, ModelDocenteT> {}

ModelDocente.init(
	{
		id_persona: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		codigo: { type: DataTypes.INTEGER },
	},
	{ sequelize, modelName: 'docente', timestamps: false }
);

ModelDocente.hasMany(ModelCargaPlan, {
	foreignKey: 'id_persona',
	sourceKey: 'id_persona',
});

ModelCargaPlan.belongsTo(ModelDocente, {
	foreignKey: 'id_persona',
	targetKey: 'id_persona',
});
