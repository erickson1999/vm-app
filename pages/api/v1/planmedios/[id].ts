import { NextApiRequest, NextApiResponse } from "next";
import { ModelPlan_medio } from "../../../../models";
import { useRouter } from "next/router";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const id_plan = [req.query.id];
        const getPlan = await ModelPlan_medio.findOne({
          where: { id_plan },
        });
        return res.status(200).json(getPlan);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "PUT":
      try {
        const id_plan = [req.query.id];
        const {
          id_plan_participante,
          id_carga_plan,
          id_persona,
          certificado,
          estado,
          horas,
        } = req.body;
        const newPlanMedio = await ModelPlan_medio.update(
          {
            id_plan_participante,
            id_carga_plan,
            id_persona,
            certificado,
            estado,
            horas,
          },
          { where: { id_plan } }
        );
        const planMedio = await ModelPlan_medio.findOne({
          where: { id_plan },
        });
        return res.status(200).json(planMedio);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "DELETE":
      try {
        const id_plan = [req.query.id];
        await ModelPlan_medio.destroy({
          where: {
            id_plan,
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
