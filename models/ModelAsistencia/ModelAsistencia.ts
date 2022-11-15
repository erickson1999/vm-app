import { sequelize } from "../../db";
import { DataTypes, Model } from "sequelize";
import { ModelAsistenciaT } from "./";
//import { ModelPlan_participante } from  '../ModelPlan_participante';

export class ModelAsistencia extends Model<any, ModelAsistenciaT> {}

ModelAsistencia.init(
  {
    id_asistencia: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    id_plan_participante: { type: DataTypes.BIGINT },
    fecha_asis: { type: DataTypes.TIME },
    fecha_termino: { type: DataTypes.TIME },
    estado: { type: DataTypes.STRING(10) },
    nota: { type: DataTypes.INTEGER },
    horas: { type: DataTypes.NUMBER },
    evidencia: { type: DataTypes.STRING },
    codigo: { type: DataTypes.INTEGER },
  },

  { sequelize, modelName: "asistencia", timestamps: false }
);
