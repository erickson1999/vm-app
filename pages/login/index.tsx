import { useContext } from 'react';

import Image from "next/image"

import { Box, TextField, Button } from '@mui/material';

import { useFormik } from 'formik';

import { useRouter } from 'next/router';

import { ContextAuth } from '../../context/ContextAuth';
import { LayoutGeneral } from "../../layouts"



interface FormLoginI {
	usuario: string;
	password: string;
}

const initialValues: FormLoginI = { usuario: '', password: '' };

const PageLogin = () => {
	const { setAuth } = useContext(ContextAuth)

	const router = useRouter()
	const onSubmit = (values: FormLoginI) => {
		fetch("/api/v1/auth/login", { method: "POST", body: JSON.stringify(values) })
			.then((resRaw) => resRaw.json()).then((res) => {
				console.log(res)
				if (res.ok === true) {
					setAuth(res.token, res.data[0])
					router.push("asistencias")
				}
			})
	};


	const formik = useFormik({
		initialValues,
		onSubmit
	})

	return (

		<form onSubmit={formik.handleSubmit} className="h-10/12 flex justify-center items-center mt-4">
			<Box className='border shadow-md w-96 h-96 p-7 flex flex-col justify-around'>
				<Image src={"/logo-upeu.svg"} alt="Picture of the author"
					width={500}
					height={500}>
				</Image>
				<Box className='flex flex-col gap-y-2'>
					<TextField
						className='w-full'
						label="Usuario"
						id="usuario"
						name="usuario"
						type="text"
						onChange={formik.handleChange}
						value={formik.values.usuario}
					/>
					<TextField
						className='w-full'
						id="outlined-uncontrolled"
						label="Contraseña"
						type="password"
						name="password"
						onChange={formik.handleChange}
						value={formik.values.password}
					/>
				</Box>
				<Button variant='outlined' type='submit'>Ingresar</Button>
			</Box>
		</form>

	);
};

export default PageLogin