import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';
import { ModelGrupoT } from '.';
import { ModelCargaPlan } from '../ModelCargaPlan';

export class ModelGrupo extends Model<any, ModelGrupoT> {}

ModelGrupo.init(
	{
		id_grupo: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nombre: { type: DataTypes.CHAR(50)},
	    estado: { type: DataTypes.CHAR (20)},
	    alias: { type: DataTypes.CHAR(10) },
	},
	{ sequelize, modelName: 'grupo', timestamps:false }
);

ModelGrupo.hasMany(ModelGrupo,{
	foreignKey: 'id_grupo',
	sourceKey: 'id_grupo'
})
ModelCargaPlan.belongsTo(ModelCargaPlan,{
	foreignKey: 'id_grupo',
	targetKey: 'id_grupo'
})

