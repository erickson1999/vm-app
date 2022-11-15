import { NextApiRequest, NextApiResponse } from "next";
import { ModelCargaPlan } from "../../../../models";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const cargaPlanes = await ModelCargaPlan.findAll();
        return res.status(200).json(cargaPlanes);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "POST":
      try {
        const {
          id_persona,
          id_periodo,
          id_modalidad,
          id_plan,
          id_ciclo,
          id_grupo,
          estado,
          fecha_inicio,
          fecha_fin,
          horas,
          tolerancia,
        } = req.body;
        const newCargaPlan = await ModelCargaPlan.create({
          id_persona,
          id_periodo,
          id_modalidad,
          id_plan,
          id_ciclo,
          id_grupo,
          estado,
          fecha_inicio,
          fecha_fin,
          horas,
          tolerancia,
        });
        return res.status(200).json(newCargaPlan);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    default:
      return res.status(405).json("Method not allowed");
  }
};
