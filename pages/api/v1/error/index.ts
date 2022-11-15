import { NextApiRequest, NextApiResponse } from 'next';

type ResponseApi = {
	message: string;
};

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<ResponseApi>
) => {
	const {
		query: { message = 'ocurrio un error', status = 400 },
	} = req;

	res.status(Number(status)).json({ message: message.toString() });
};
export default handler;
