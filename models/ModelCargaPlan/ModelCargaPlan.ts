import { sequelize } from "../../db";
import { DataTypes, Model } from "sequelize";
import { ModelCargaPlanT } from "./";
import { ModelPlan_participante } from "../ModelPlan_participante";
import { ModelPlan_sesion } from "../ModelPlan_sesion";

export class ModelCargaPlan extends Model<any, ModelCargaPlanT> {}

ModelCargaPlan.init(
  {
    id_carga_plan: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    id_persona: {
      type: DataTypes.BIGINT,
    },
    id_periodo: {
      type: DataTypes.BIGINT,
    },
    id_modalidad: {
      type: DataTypes.BIGINT,
    },
    id_plan: {
      type: DataTypes.BIGINT,
    },
    id_ciclo: {
      type: DataTypes.BIGINT,
    },
    id_grupo: {
      type: DataTypes.BIGINT,
    },
    estado: {
      type: DataTypes.STRING,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
    },
    fecha_fin: {
      type: DataTypes.DATE,
    },
    horas: {
      type: DataTypes.NUMBER,
    },
    tolerancia: {
      type: DataTypes.NUMBER,
    },
  },
  { sequelize, modelName: "carga_plan", timestamps: false }
);

ModelCargaPlan.hasMany(ModelCargaPlan, {
  foreignKey: "id_carga_plan",
  sourceKey: "id_carga_plan",
});
ModelPlan_participante.belongsTo(ModelPlan_participante, {
  foreignKey: "id_carga_plan",
  targetKey: "id_carga_plan",
});

ModelCargaPlan.hasMany(ModelCargaPlan, {
  foreignKey: "id_carga_plan",
  sourceKey: "id_carga_plan",
});
ModelPlan_participante.belongsTo(ModelPlan_participante, {
  foreignKey: "id_carga_plan",
  targetKey: "id_carga_plan",
});

ModelCargaPlan.hasMany(ModelCargaPlan, {
  foreignKey: "id_carga_plan",
  sourceKey: "id_carga_plan",
});
ModelPlan_sesion.belongsTo(ModelPlan_sesion, {
  foreignKey: "id_carga_plan",
  targetKey: "id_carga_plan",
});
