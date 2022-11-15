import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';
import { ModelSucursalT } from '.';
import { ModelEscuela_sucursal } from '../ModelEscuela_sucursal';

export class ModelSucursal extends Model<any, ModelSucursalT> {}

ModelSucursal.init(
	{
		id_sucursal: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nombre: { type: DataTypes.CHAR },
	    estado: { type: DataTypes.CHAR },
	    
	},
	{ sequelize, modelName: 'sucursal', timestamps:false }
);

ModelSucursal.hasMany(ModelSucursal,{
	foreignKey: 'id_sucursal',
	sourceKey: 'id_sucursal'
})
ModelEscuela_sucursal.belongsTo(ModelEscuela_sucursal,{
	foreignKey: 'id_sucursal',
	targetKey: 'id_sucursal'
})