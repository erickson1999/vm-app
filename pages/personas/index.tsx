import { useContext, useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Button, ModalForRemove, SubTitle } from '../../components';
import { Table } from '../../components/Table';
import { UserI } from '../../components/Table/TableInterface';
import { ContextUI } from '../../context/ContextUI';
import { LayoutGeneral } from '../../layouts';
import { PagePersonsForm } from '../../components';
import axios from "axios"


const heads = ['id', "Nombre", 'Apellido paterno', 'Apellido Materno', 'DNI', 'Dirección', "Correo", "Número", "Fecha de registro"];

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

	const removeItem = (id_persona: string) => {
		if (!persons) return
		const newPersons = persons.filter((person) => {
			return person.id_persona !== id_persona
		})
		axios.delete(`api/v1/personas/${id_persona}`)
			.then((res) => {
				setIsOpenModal(false)
				setPersons(newPersons)
			})
			.catch((err) => { console.log({ err }) })

	}
	const updateItem = (item: PersonI) => {
		if (!persons) return
		const newPersons = persons.map((person) => {
			if (person.id_persona !== item.id_persona) {
				return person
			}
			return item

		})
		axios.put(`api/v1/personas/${item.id_persona}`, item)
			.then((res) => {
				setIsOpenModal(false)
				setPersons(newPersons)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	const createItem = (item: PersonI) => {
		if (!persons) return
		axios.post(`api/v1/auth/register`, item)
			.then((res) => {
				console.log(res)
				setIsOpenModal(false)
				setPersons([res.data.data[0], ...persons])
			})
			.catch((err) => {
				console.log(err)
			})
	}


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
							setContentModal(<PagePersonsForm createItem={createItem} />);
							setIsOpenModal(true);
						}}
					></Button>
					<Table
						data={persons}
						heads={heads}
						configs={{ numeration: true, align: 'text-center' }}
						options={{
							enabled: true,
							actions: (item: PersonI) => {
								return (
									<>
										<AiOutlineEdit
											className="text-orange-500 cursor-pointer"
											onClick={() => {
												setContentModal(
													<PagePersonsForm itemData={item} updateItem={updateItem} />
												);
												setIsOpenModal(true);
											}}
										></AiOutlineEdit>
										<AiOutlineDelete
											className="text-red-500 cursor-pointer"
											onClick={() => {
												setContentModal(
													<ModalForRemove deleteItem={() => {
														removeItem(item.id_persona)
													}} >
														<SubTitle className='font-semibold text-black'>{`Eliminar a: este item`}</SubTitle>
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