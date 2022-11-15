import { NextApiRequest, NextApiResponse } from "next";
import { ModelVinculacion } from "../../../../models";
import { useRouter } from "next/router";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const id_vinculacion = [req.query.id];
        const getVinculacion = await ModelVinculacion.findOne({
          where: { id_vinculacion },
        });
        return res.status(200).json(getVinculacion);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "PUT":
      try {
        const id_vinculacion = [req.query.id];
        const { nombre, detalle, tipo, archivo, estado } = req.body;
        const newVinculacion = await ModelVinculacion.update(
          { nombre, detalle, tipo, archivo, estado },
          { where: { id_vinculacion } }
        );
        const vinculacion = await ModelVinculacion.findOne({
          where: { id_vinculacion },
        });
        return res.status(200).json(vinculacion);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "DELETE":
      try {
        const id_vinculacion = [req.query.id];
        await ModelVinculacion.destroy({
          where: {
            id_vinculacion,
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
