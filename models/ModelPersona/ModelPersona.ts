import { sequelize } from '../../db';
import { DataTypes, Model } from 'sequelize';
import { ModelPersonaT } from '.';
export class ModelPersona extends Model<any, ModelPersonaT> {}

ModelPersona.init(
	{
		id_persona: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		nombre: { type: DataTypes.CHAR(100) },
		appaterno: { type: DataTypes.CHAR(100) },
		apmaterno: { type: DataTypes.CHAR(100) },
		dni: {
			type: DataTypes.NUMBER({ length: 10 }),
			unique: { name: 'dni', msg: 'el número de dni ya está en uso' },
		},
		direccion: { type: DataTypes.CHAR(200) },
		correo: {
			type: DataTypes.CHAR(200),
			validate: { isEmail: { msg: 'El correo ingresado no es valido' } },
		},
		numero: {
			type: DataTypes.NUMBER({ length: 15 }),
			validate: { isNumeric: { msg: 'El numero ingresado no es valido' } },
		},
		fecha_registro: {
			type: DataTypes.DATE,
			validate: {
				isDate: { msg: 'La fecha ingresada no valido', args: true },
			},
		},
		//usuario: { type: DataTypes.CHAR(200) },
		//password: { type: DataTypes.CHAR(200) },
	},
	{ sequelize, modelName: 'persona', timestamps: false }
);

// ModelPersona.hasMany(ModelPersona,{
// 	foreignKey: 'id_persona',
// 	sourceKey: 'id_persona'
// })
// ModelCargaPlan.belongsTo(ModelCargaPlan,{
// 	foreignKey: 'id_persona',
// 	targetKey: 'id_persona'
// })

// ModelPersona.hasMany(ModelPersona,{
// 	foreignKey: 'id_persona',
// 	sourceKey: 'id_persona'
// })
// ModelPersona_rol.belongsTo(ModelPersona_rol,{
// 	foreignKey: 'id_persona',
// 	targetKey: 'id_persona'
// })

// ModelPersona.hasMany(ModelPersona,{
// 	foreignKey: 'id_persona',
// 	sourceKey: 'id_persona'
// })
// ModelPlan_participante.belongsTo(ModelPlan_participante,{
// 	foreignKey: 'id_persona',
// 	targetKey: 'id_persona'
// })
