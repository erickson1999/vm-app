import { useEffect, useState } from 'react';

import axios from "axios"

import { FormVinculaciones, Table } from '../../components';
import { LayoutGeneral } from '../../layouts';
import { ModelVinculacionT } from '../../models';
import { TableGridColumnsI } from '../../components/Table/TableInterfaces';

const columns: TableGridColumnsI[] = [{ name: "nombre", label: "Nombre vinculacion", options: { filter: true, sort: true } },
{ name: "detalle", label: "Detalle vinculacion", options: { filter: true, sort: true } },
{ name: "tipo", label: "Tipo vinculacion", options: { filter: true, sort: true } },
{ name: "archivo", label: "Archivo vinculacion", options: { filter: true, sort: true } },
{ name: "estado", label: "Estado vinculacion", options: { filter: true, sort: true } },
]

const PageVinculaciones = () => {
	const [vinculaciones, setvinculaciones] = useState<ModelVinculacionT[]>()
	useEffect(() => {
		axios.get(`/api/v1/vinculaciones`).then((res) => {
			setvinculaciones(res.data)
		}).catch((err) => { })
	}, []
	)

	const removeItem = (item: ModelVinculacionT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		const idItem = item.id_vinculacion
		if (!vinculaciones) return
		const newvinculaciones = vinculaciones.filter((vinculaciones) => {
			return vinculaciones.id_vinculacion !== idItem
		})
		axios.delete(`/api/v1/vinculaciones/${idItem}`)
			.then((res) => {
				setvinculaciones(newvinculaciones)
				setIsOpenModal(false)
			})
			.catch((err) => { console.log({ err }) })

	}
	const updateItem = (item: ModelVinculacionT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!vinculaciones) return
		const newvinculaciones = vinculaciones.map((vinculaciones) => {
			if (vinculaciones.id_vinculacion !== item.id_vinculacion) {
				return vinculaciones
			}
			return item
		})
		axios.put(`/api/v1/vinculaciones/${item.id_vinculacion}`, item)
			.then((res) => {
				setvinculaciones(newvinculaciones)
				setIsOpenModal(false)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	const createItem = (item: ModelVinculacionT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!vinculaciones) return
		axios.post(`/api/v1/vinculaciones`, item)
			.then((res) => {
				console.log({ res })
				setvinculaciones([res.data, ...vinculaciones])
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
			{vinculaciones ? <div className="h-10/12">
				<div className="flex flex-col items-center justify-start h-full w-full	">
					<Table
						data={vinculaciones}
						columns={columns}
						Form={FormVinculaciones}
						createItem={createItem}
						updateItem={updateItem}
						deleteItem={removeItem}></Table>
				</div>
			</div> : <div className='h-10/12'>loading...</div>}
		</LayoutGeneral>
	);
};
export default PageVinculaciones