import { useContext, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Field, Form, Formik } from 'formik';

import { Button } from '../../components';
import { ContextAuth } from '../../context/ContextAuth';
import { LayoutGeneral } from "../../layouts"
interface FormRegisterI {
	apmaterno: string,
	appaterno: string,
	correo: string,
	direccion: string,
	dni: string,
	fecha_registro?: string,
	nombre: string,
	numero: string,
	usuario: string;
	password: string;
}

const initialValues: FormRegisterI =
{
	apmaterno: '',
	appaterno: '',
	correo: '',
	direccion: '',
	dni: '',
	nombre: '',
	numero: '',
	usuario: '',
	password: ''
}

const validate = (values: FormRegisterI) => {
	
	const errors: any = {};
	if (!values.usuario) {
		errors.usuario = '*El campo email es requerido';
	}
	if (!values.password) {
		errors.password = '*El campo contraseña es requerido';
	}
	if (!values.nombre) {
		errors.nombre = '*El campo contraseña es requerido';
	}
	if (!values.appaterno) {
		errors.appaterno = '*El campo apellido paterno es requerido';
	}
	if (!values.apmaterno) {
		errors.apmaterno = '*El campo apellido materno es requerido';
	}
	if (!values.dni) {
		errors.dni = '*El campo dni es requerido';
	}
	if (!values.direccion) {
		errors.direccion = '*El campo dirección es requerido';
	}
	if (!values.correo) {
		errors.correo = '*El campo correo es requerido';
	}
	if (!values.numero) {
		errors.numero = '*El campo número es requerido';
	}
	return errors;
};

const PageRegister = () => {
	const [errorApi, setErrorApi] = useState("")
	const { setAuth } = useContext(ContextAuth)
	const router = useRouter()

	const onSubmit = (values: FormRegisterI) => {
		fetch("api/v1/auth/register", { method: "POST", body: JSON.stringify(values) })
			.then((resRaw) => resRaw.json()).then((res) => {
				if (res.ok === false) {
					setErrorApi(res.message)
					router.push("persons")
				}
			})
	};
	return (
		<LayoutGeneral
			mainHeight="h-screen"
			footerHeight="h-1/12"
			navbarHeight="h-1/12"
		>
			<div className="h-10/12 flex justify-center items-center">
				{/* card register */}
				<div className="p-10 rounded-3xl shadow-xl w-3/4  lg:w-3/5 xl:w-2/5 max-w-2xl flex flex-col items-center gap-y-6 border">
					<figure>
						<img src="/logo-upeu.svg" alt="logo-upeu" />
					</figure>
					<h1 className="font-black text-3xl italic">REGISTRO</h1>
					<Formik
						initialValues={initialValues}
						validate={validate}
						onSubmit={onSubmit}
					>
						{() => (
							<Form className="flex flex-col gap-y-4  w-full items-center ">
								<div className='flex flex-col sm:flex-row gap-y-4 w-full'>
									<div className='flex flex-col gap-y-4 w-full'>
										<Field
											name={'usuario'}
											placeholder={'Usuario'}
											type={'text'}
											className={'bg-gray-100 w-full rounded-full px-4 py-2'}
											required
										></Field>
										<Field
											name={'password'}
											placeholder={'Contraseña'}
											type={'password'}
											className={'bg-gray-100 w-full rounded-full px-4 py-2'}
											required
										></Field>
										<Field
											name={'nombre'}
											placeholder={'Nombre'}
											type={'text'}
											className={'bg-gray-100 w-full rounded-full px-4 py-2'}
											required
										></Field>
										<Field
											name={'appaterno'}
											placeholder={'Apellido paterno'}
											type={'text'}
											className={'bg-gray-100 w-full rounded-full px-4 py-2'}
											required
										></Field>
									</div>
									<div className='flex flex-col gap-y-4 w-full'>
										<Field
											name={'apmaterno'}
											placeholder={'Apellido materno'}
											type={'text'}
											className={'bg-gray-100 w-full rounded-full px-4 py-2'}
											required

										></Field>
										<Field
											name={'dni'}
											placeholder={'Dni'}
											type={'number'}
											className={'bg-gray-100 w-full rounded-full px-4 py-2'}
											required
										></Field>

										<Field
											name={'direccion'}
											placeholder={'Dirección'}
											type={'text'}
											className={'bg-gray-100 w-full rounded-full px-4 py-2'}
											required
										></Field>

										<Field
											name={'correo'}
											placeholder={'Correo electrónico'}
											type={'text'}
											className={'bg-gray-100 w-full rounded-full px-4 py-2'}
											required
										></Field>

									</div>
								</div>
								<Field
									name={'numero'}
									placeholder={'Número de contacto'}
									type={'text'}
									className={'bg-gray-100 w-full rounded-full px-4 py-2'}
								></Field>
								<span className='text-red-400'>*{errorApi}</span>
								<Button
									type="submit"
									background={'bg-primary'}
									text={'REGISTRAR'}
									padding={'px-6 py-2'}
									rounded={'rounded-full'}
									colorText={'text-white'}
									className={'font-bold '}
								></Button>
							</Form>
						)}
					</Formik>
					<Link href={'/recovery-account'} >
						<p className=" text-primary text-md">¿Olvidaste tu contraseña?</p>
					</Link>
				</div>
			</div>
		</LayoutGeneral>
	);
};

export default PageRegister