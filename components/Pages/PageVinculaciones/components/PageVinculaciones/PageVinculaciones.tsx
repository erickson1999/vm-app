import { FC, useContext } from 'react';

import { Field, Form, Formik } from 'formik';

import { Button, UserI } from '../../../..';
import { ContextUI } from '../../../../../context/ContextUI';

const initialValues: any = {
	estado: "activo"
};

const validate = (values: any) => {
	const errors = {};
	//validations

	return errors;
};

export interface PagePersonFormI {
	itemData?: Object;
	updateItem?: (item: any) => void
	createItem?: (item: any) => void
}



export const PageFacultadesForm: FC<PagePersonFormI> = ({ itemData, updateItem, createItem }) => {
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
						<Field
							name="nombre"
							type="text"
							placeholder="Nombre"
							className={'bg-gray-100 w-full rounded-full px-4 py-2'}
						></Field>
						<Field
							as="select"
							name="estado"
							placeholder="Estado"
							className={'bg-gray-100 w-full rounded-full px-4 py-2'}
						>
							<option value="activo" defaultChecked>activo</option>
							<option value="inactivo">inactivo</option>
						</Field>
						<Field
							name="alias"
							type="text"
							placeholder="Alias"
							className={'bg-gray-100 w-full rounded-full px-4 py-2'}
						></Field>

						<div className="flex justify-center">
							<Button
								type="submit"
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
