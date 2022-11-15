import { NextApiRequest, NextApiResponse } from "next";
import { ModelPlan_sesion } from "../../../../models";
import { useRouter } from "next/router";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const id_plan_sesion = [req.query.id];
        const getPlan_sesion = await ModelPlan_sesion.findOne({
          where: { id_plan_sesion },
        });
        return res.status(200).json(getPlan_sesion);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "PUT":
      try {
        const id_plan_sesion = [req.query.id];
        const {
          id_carga_plan,
          detalle,
          fecha_sesion,
          fin_sesion,
          horas,
          evidencia,
          tolerancia_fecha_sesion,
          tolerancia_fin_sesion,
        } = req.body;
        const newPlanSesion = await ModelPlan_sesion.update(
          {
            id_carga_plan,
            detalle,
            fecha_sesion,
            fin_sesion,
            horas,
            evidencia,
            tolerancia_fecha_sesion,
            tolerancia_fin_sesion,
          },
          { where: { id_plan_sesion } }
        );
        const PlanSesion = await ModelPlan_sesion.findOne({
          where: { id_plan_sesion },
        });
        return res.status(200).json(PlanSesion);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "DELETE":
      try {
        const id_plan_sesion = [req.query.id];
        await ModelPlan_sesion.destroy({
          where: {
            id_plan_sesion,
          },
        });
        return res.send(200);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    default:
      return res.status(405).json("Method not allowed");
  }
};
