import { sequelize } from "../../db";
import { DataTypes, Model } from "sequelize";
import { ModelCicloT } from "./ModelCicloTypes";

import { ModelCargaPlan } from "../ModelCargaPlan";
export class ModelCiclo extends Model<any, ModelCicloT> {}

ModelCiclo.init(
  {
    id_ciclo: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    alias: {
        type: DataTypes.STRING,
      },
  },
  { sequelize, modelName: "ciclo", timestamps: false }
);

ModelCiclo.hasMany(ModelCiclo,{
	foreignKey: 'id_ciclo',
	sourceKey: 'id_ciclo'
})
ModelCargaPlan.belongsTo(ModelCargaPlan,{
	foreignKey: 'id_ciclo',
	targetKey: 'id_ciclo'
})
