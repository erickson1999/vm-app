import { NextApiRequest, NextApiResponse } from "next";
import { ModelCargaPlan } from "../../../../models";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const id_carga_plan = [req.query.id];
        const getCargaPlan = await ModelCargaPlan.findOne({
          where: { id_carga_plan },
        });
        return res.status(200).json(getCargaPlan);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "PUT":
      try {
        const id_carga_plan = [req.query.id];
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
        const newCargaPlan = await ModelCargaPlan.update(
          {
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
          },
          { where: { id_carga_plan } }
        );
        const cargaPlan = await ModelCargaPlan.findOne({
          where: { id_carga_plan },
        });
        return res.status(200).json(cargaPlan);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "DELETE":
      try {
        const id_carga_plan = [req.query.id];
        await ModelCargaPlan.destroy({
          where: {
            id_carga_plan,
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
