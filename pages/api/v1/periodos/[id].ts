import { NextApiRequest, NextApiResponse } from "next";
import { ModelPeriodo } from "../../../../models";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const id_periodos = [req.query.id];
        const getPeriodos = await ModelPeriodo.findOne({
          where: { id_periodos },
        });
        return res.status(200).json(getPeriodos);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "PUT":
      try {
        const id_periodo = [req.query.id];
        const { nombre, estado } = req.body;
        const newPeriodo = await ModelPeriodo.update(
          { nombre, estado },
          { where: { id_periodo } }
        );
        const periodo = await ModelPeriodo.findOne({
          where: { id_periodo },
        });
        return res.status(200).json(periodo);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "DELETE":
      try {
        const id_periodo = [req.query.id];
        await ModelPeriodo.destroy({
          where: {
            id_periodo,
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
