import { useContext, useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Button, ModalForRemove, SubTitle } from '../../components';
import { Table } from '../../components/Table';
import { UserI } from '../../components/Table/TableInterface';
import { ContextUI } from '../../context/ContextUI';
import { LayoutGeneral } from '../../layouts';
import { PagePersonsForm } from '../../components';

import jwt from "jsonwebtoken"

const usersFake: UserI[] = [
	{
		dni: 70521769,
		nombreCompleto: 'Erickson Raul Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '201712135',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 70707070,
		nombreCompleto: 'Dulce Marian Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '347190845',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 41345550,
		nombreCompleto: 'Marleny Churata Vizarrita',
		ciclo: '7',
		grupo: 'Único',
		codigo: '432457379',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 40105720,
		nombreCompleto: 'Raymundo Raul Quispe Supa',
		ciclo: '7',
		grupo: 'Único',
		codigo: '238904567',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 70521769,
		nombreCompleto: 'Erickson Raul Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '201712135',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 70521769,
		nombreCompleto: 'Erickson Raul Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '201712135',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 70521769,
		nombreCompleto: 'Erickson Raul Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '201712135',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 70521769,
		nombreCompleto: 'Erickson Raul Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '201712135',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 70521769,
		nombreCompleto: 'Erickson Raul Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '201712135',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 70521769,
		nombreCompleto: 'Erickson Raul Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '201712135',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 70521769,
		nombreCompleto: 'Erickson Raul Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '201712135',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 70521769,
		nombreCompleto: 'Erickson Raul Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '201712135',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 70521769,
		nombreCompleto: 'Erickson Raul Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '201712135',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 70521769,
		nombreCompleto: 'Erickson Raul Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '201712135',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 70521769,
		nombreCompleto: 'Erickson Raul Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '201712135',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 70521769,
		nombreCompleto: 'Erickson Raul Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '201712135',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 70521769,
		nombreCompleto: 'Erickson Raul Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '201712135',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 70521769,
		nombreCompleto: 'Erickson Raul Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '201712135',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 70521769,
		nombreCompleto: 'Erickson Raul Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '201712135',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
	{
		dni: 70521769,
		nombreCompleto: 'Erickson Raul Quispe Churata',
		ciclo: '7',
		grupo: 'Único',
		codigo: '201712135',
		correo: 'ericksonraulquispechurata@gmail.com',
	},
];

const heads = ['id', 'Nombre', 'Apellido paterno', 'Apellido Materno', 'DNI', 'Dirección', "Correo", "Número", "fecha_registro"];

export interface PersonI {
	id_persona: string;
	nombre: string;
	appaterno: string;
	apmaterno: string;
	dni: string;
	direccion: string;
	correo: string;
	numero: string;
	fecha_registro: Date;
}



const PagePersons = () => {
	const [persons, setPersons] = useState<PersonI[]>()

	const {
		modal: { setIsOpenModal, setContentModal },
	} = useContext(ContextUI);

	useEffect(() => {
		fetch(`api/v1/personas`, {
		}).then((resRaw) => resRaw.json()).then((res: PersonI[]) => { setPersons(res) })
	}, []
	)


	return (
		<LayoutGeneral
			footerHeight="h-1/12"
			navbarHeight="h-1/12"
			mainHeight="h-screen"
		>
			{persons ? <div className="h-10/12">
				<div className="flex flex-col items-center justify-center h-full">
					<Button
						background={'bg-primary'}
						text={'Nueva persona +'}
						padding={'px-4 py-2'}
						rounded={'rounded-full'}
						colorText={'text-white'}
						className={
							'font-bold my-1 border hover:border-primary hover:bg-white transition-all hover:text-primary ease-in'
						}
						onClick={() => {
							setContentModal(<PagePersonsForm />);
							setIsOpenModal(true);
						}}
					></Button>
					<Table
						data={persons}
						heads={heads}
						configs={{ numeration: true, align: 'text-center' }}
						options={{
							enabled: true,
							actions: (item: UserI) => {
								return (
									<>
										<AiOutlineEdit
											className="text-orange-500 cursor-pointer"
											onClick={() => {
												setContentModal(
													<PagePersonsForm personData={item} />
												);
												setIsOpenModal(true);
											}}
										></AiOutlineEdit>
										<AiOutlineDelete
											className="text-red-500 cursor-pointer"
											onClick={() => {
												setContentModal(
													<ModalForRemove deleteItem={() => { setIsOpenModal(false) }} >
														<SubTitle className='font-semibold text-black'>{`Eliminar a: "${item.nombreCompleto.toUpperCase()}"`}</SubTitle>
													</ModalForRemove>
												);
												setIsOpenModal(true);
											}}
										></AiOutlineDelete>
									</>
								);
							},
						}}
					></Table>
				</div>
			</div> : <div className='h-10/12'>loading...</div>}
		</LayoutGeneral>
	);
};
export default PagePersons