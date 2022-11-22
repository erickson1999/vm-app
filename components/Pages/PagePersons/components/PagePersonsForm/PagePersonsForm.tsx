import { FC, useContext } from 'react';

import { ErrorMessage, Field, Form, Formik } from 'formik';

import { Button, UserI } from '../../../..';
import { ContextUI } from '../../../../../context/ContextUI';
import { PersonI } from '../../../../../pages/personas';

const initialValues: any = {};

const validate = (values: any) => {
	const errors = {};
	//validations

	return errors;
};

type PagePersonFormConfigI = {
	method: string
	url: string
}
export interface PagePersonFormI {
	itemData?: PersonI;
	updateItem?: (item: any) => void
	createItem?: (item: any) => void
}






export const PagePersonsForm: FC<PagePersonFormI> = ({ itemData, updateItem, createItem }) => {
	const {
		modal: { setIsOpenModal },
	} = useContext(ContextUI);

	const onSubmit = (values: any) => {
		console.log(values)
		if (updateItem) {
			updateItem(values)
		}
		if (createItem) {
			createItem(values)
		}
	}


	return (
		<Formik
			initialValues={itemData || initialValues}
			validate={validate}
			onSubmit={onSubmit}
		>
			{() => {
				return (
					<Form className="flex flex-col gap-y-2 p-2 mt-2">
						{
							createItem && <><Field
								name="usuario"
								type="string"
								placeholder="usuario"
								className={'bg-gray-100 w-full rounded-full px-4 py-2'}
								required
							></Field>
								<Field
									name="password"
									type="string"
									placeholder="contraseña"
									className={'bg-gray-100 w-full rounded-full px-4 py-2'}
									required
								></Field></>
						}
						<Field
							name="dni"
							type="number"
							placeholder="DNI"
							className={'bg-gray-100 w-full rounded-full px-4 py-2'}
							required
						></Field>
						<Field
							name="nombre"
							placeholder="Nombre"
							className={'bg-gray-100 w-full rounded-full px-4 py-2'}
							required
						></Field>
						<Field
							name="appaterno"
							placeholder="Apellido paterno"
							className={'bg-gray-100 w-full rounded-full px-4 py-2'}
							required
						></Field>
						<Field
							name="apmaterno"
							placeholder="Apellido materno"
							className={'bg-gray-100 w-full rounded-full px-4 py-2'}
							required
						></Field>
						<Field
							name="numero"
							type="number"
							placeholder="Número"
							className={'bg-gray-100 w-full rounded-full px-4 py-2'}
							required
						></Field>
						<Field
							name="correo"
							placeholder="Correo"
							className={'bg-gray-100 w-full rounded-full px-4 py-2'}
							required
						></Field>
						<Field
							name="direccion"
							placeholder="Direccion"
							className={'bg-gray-100 w-full rounded-full px-4 py-2'}
							required
						></Field>
						<div className="flex justify-center">
							<Button
								type='submit'
								background={'bg-primary'}
								text={'Guardar cambios'}
								padding={'p-2'}
								rounded={'rounded-full'}
								colorText={'text-white'}
								className={
									' w-1/2 mt-2 font-bold my-1 border hover:border-primary hover:bg-white transition-all hover:text-primary ease-in'
								}
								onClick={() => {
									// setIsOpenModal(false);
								}}
							></Button>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};
