import { useEffect, useState } from 'react';

import axios from "axios"

import { FormFacultades, Table } from '../../components';
import { LayoutGeneral } from '../../layouts';
import { ModelFacultadT } from '../../models';
import { TableGridColumnsI } from '../../components/Table/TableInterfaces';

const columns: TableGridColumnsI[] = [{ name: "nombre", label: "Nombre Facultad", options: { filter: true, sort: true } },
{ name: "estado", label: "Estado Facultad", options: { filter: true, sort: true } },
{ name: "alias", label: "Alias Facultad", options: { filter: true, sort: true } }]

const PageFacultades = () => {
	const [facultades, setFacultades] = useState<ModelFacultadT[]>()
	useEffect(() => {
		axios.get(`/api/v1/facultades`).then((res) => {
			setFacultades(res.data)
		}).catch((err) => { })
	}, []
	)

	const removeItem = (item: ModelFacultadT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		const idItem = item.id_facultad
		if (!facultades) return
		const newFacultades = facultades.filter((facultad) => {
			return facultad.id_facultad !== idItem
		})
		axios.delete(`/api/v1/facultades/${idItem}`)
			.then((res) => {
				setFacultades(newFacultades)
				setIsOpenModal(false)
			})
			.catch((err) => { console.log({ err }) })

	}
	const updateItem = (item: ModelFacultadT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!facultades) return
		const newfacultades = facultades.map((facultad) => {
			if (facultad.id_facultad !== item.id_facultad) {
				return facultad
			}
			return item
		})
		axios.put(`/api/v1/facultades/${item.id_facultad}`, item)
			.then((res) => {
				setFacultades(newfacultades)
				setIsOpenModal(false)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	const createItem = (item: ModelFacultadT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!facultades) return
		axios.post(`//api/v1/facultades`, item)
			.then((res) => {
				console.log({ res })
				setFacultades([res.data, ...facultades])
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
			{facultades ? <div className="h-10/12">
				<div className="flex flex-col items-center justify-start h-full">
					<Table
						data={facultades}
						columns={columns}
						Form={FormFacultades}
						createItem={createItem}
						updateItem={updateItem}
						deleteItem={removeItem}></Table>
				</div>
			</div> : <div className='h-10/12'>loading...</div>}
		</LayoutGeneral>
	);
};
export default PageFacultades