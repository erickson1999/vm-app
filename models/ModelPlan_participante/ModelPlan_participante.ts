import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';
import { ModelPlan_participanteT } from '.';
import { ModelParticipante } from '../ModelParticipante';
export class ModelPlan_participante extends Model<
	any,
	ModelPlan_participanteT
> {}

ModelPlan_participante.init(
	{
		id_plan_participante: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		id_carga_plan: { type: DataTypes.BIGINT },
		id_persona: { type: DataTypes.BIGINT },
		certificado: { type: DataTypes.CHAR },
		estado: { type: DataTypes.CHAR(30) },
		horas: { type: DataTypes.NUMBER },
	},
	{ sequelize, modelName: 'plan_participante', timestamps: false }
);

ModelPlan_participante.belongsTo(ModelParticipante, {
	foreignKey: 'id_persona',
	targetKey: 'id_persona',
});
ModelParticipante.hasMany(ModelPlan_participante, {
	foreignKey: 'id_persona',
	sourceKey: 'id_persona',
});
