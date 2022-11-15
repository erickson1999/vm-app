import { NextApiRequest, NextApiResponse } from "next";
import { ModelPlan_participante } from "../../../../models";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const plan_participante = await ModelPlan_participante.findAll();
        return res.status(200).json(plan_participante);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "POST":
      try {
        const {
          id_plan_participante,
          id_carga_plan,
          id_persona,
          certificado,
          estado,
          horas,
        } = req.body;
        const newPlan_participante = await ModelPlan_participante.create({
          id_plan_participante,
          id_carga_plan,
          id_persona,
          certificado,
          estado,
          horas,
        });
        return res.status(200).json(newPlan_participante); //
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    default:
      return res.status(405).json("Method not allowed");
  }
};
