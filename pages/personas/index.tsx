import { useEffect, useState } from 'react';
import axios from "axios"
import { FormPersonas, Table } from '../../components';
import { LayoutGeneral } from '../../layouts';
import { ModelPersonaT } from '../../models';
import { TableGridColumnsI } from '../../components/Table/TableInterfaces';

const columns: TableGridColumnsI[] = [
	{ name: "nombre", label: "Nombre", options: { filter: true, sort: true } },
	{ name: "appaterno", label: "Apellido Paterno", options: { filter: true, sort: true } },
	{ name: "apmaterno", label: "Apellido Materno", options: { filter: true, sort: true } },
	{ name: "dni", label: "Alias Facultad", options: { filter: true, sort: true } },
	{ name: "direccion", label: "Alias Facultad", options: { filter: true, sort: true } },
	{ name: "correo", label: "Alias Facultad", options: { filter: true, sort: true } },
	{ name: "numero", label: "Alias Facultad", options: { filter: true, sort: true } },]


const PagePersonas = () => {
	const [personas, setpersonas] = useState<ModelPersonaT[]>()
	useEffect(() => {
		axios.get(`/api/v1/personas`).then((res) => {
			setpersonas(res.data)
		}).catch((err) => { })
	}, []
	)

	const removeItem = (item: ModelPersonaT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		const idItem = item.id_persona
		if (!personas) return
		const newpersonas = personas.filter((facultad) => {
			return facultad.id_persona !== idItem
		})
		axios.delete(`/api/v1/personas/${idItem}`)
			.then((res) => {
				setpersonas(newpersonas)
				setIsOpenModal(false)
			})
			.catch((err) => { console.log({ err }) })

	}
	const updateItem = (item: ModelPersonaT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!personas) return
		const newpersonas = personas.map((facultad) => {
			if (facultad.id_persona !== item.id_persona) {
				return facultad
			}
			return item
		})
		axios.put(`/api/v1/personas/${item.id_persona}`, item)
			.then((res) => {
				setpersonas(newpersonas)
				setIsOpenModal(false)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	const createItem = (item: ModelPersonaT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!personas) return
		axios.post(`/api/v1/personas`, item)
			.then((res) => {
				console.log({ res })
				setpersonas([res.data, ...personas])
				setIsOpenModal(false)
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
			{personas ? <div className="h-10/12">
				<div className="flex flex-col items-center justify-start h-full">
					<Table
						data={personas}
						columns={columns}
						Form={FormPersonas}
						createItem={createItem}
						updateItem={updateItem}
						deleteItem={removeItem}></Table>
				</div>
			</div> : <div className='h-10/12'>loading...</div>}
		</LayoutGeneral>
	);
};
export default PagePersonas