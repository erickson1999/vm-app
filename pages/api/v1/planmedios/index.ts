import { NextApiRequest, NextApiResponse } from "next";
import { ModelPlan_medio } from "../../../../models";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const plan_medio = await ModelPlan_medio.findAll();
        return res.status(200).json(plan_medio);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "POST":
      try {
        const { id_plan, id_escuela_sucursal, id_vinculacion } = req.body;
        const newPlan_medio= await ModelPlan_medio.create({
          id_plan,
          id_escuela_sucursal,
          id_vinculacion,
        });
        return res.status(200).json(newPlan_medio); //
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    default:
      return res.status(405).json("Method not allowed");
  }
};
