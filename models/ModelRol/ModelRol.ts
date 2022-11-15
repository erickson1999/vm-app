import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';
import { ModelRolT } from '.';
import { ModelPersona_rol } from '../ModelPersona_rol';

export class ModelRol extends Model<any, ModelRolT> {}

ModelRol.init(
	{
		id_rol: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nombre: { type: DataTypes.CHAR(40)},
	    estado: { type: DataTypes.CHAR(10) },    
	},
	{ sequelize, modelName: 'rol', timestamps:false }
);
ModelRol.hasMany(ModelRol, {
	foreignKey: "id_rol",
	sourceKey: "id_rol",
  });
  ModelPersona_rol.belongsTo(ModelPersona_rol, {
	foreignKey: "id_rol",
	targetKey: "id_rol",
  });
  
