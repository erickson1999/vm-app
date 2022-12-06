import { useEffect, useState } from 'react';

import axios from "axios"

import { FormModalidades, Table } from '../../components';
import { LayoutGeneral } from '../../layouts';
import { ModelModalidadT } from '../../models';
import { TableGridColumnsI } from '../../components/Table/TableInterfaces';

const columns: TableGridColumnsI[] = [{ name: "nombre", label: "Nombre modalidades", options: { filter: true, sort: true } },
{ name: "estado", label: "Estado modalidades", options: { filter: true, sort: true } }]

const PageModalidades = () => {
	const [modalidades, setmodalidades] = useState<ModelModalidadT[]>()
	useEffect(() => {
		axios.get(`/api/v1/modalidades`).then((res) => {
			setmodalidades(res.data)
		}).catch((err) => { })
	}, []
	)

	const removeItem = (item: ModelModalidadT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		const idItem = item.id_modalidad
		if (!modalidades) return
		const newmodalidades = modalidades.filter((modalidades) => {
			return modalidades.id_modalidad !== idItem
		})
		axios.delete(`/api/v1/modalidades/${idItem}`)
			.then((res) => {
				setmodalidades(newmodalidades)
				setIsOpenModal(false)
			})
			.catch((err) => { console.log({ err }) })

	}
	const updateItem = (item: ModelModalidadT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		console.log({ item })
		if (!modalidades) return
		const newmodalidades = modalidades.map((modalidades) => {
			if (modalidades.id_modalidad !== item.id_modalidad) {
				return modalidades
			}
			return item
		})
		axios.put(`/api/v1/modalidades/${item.id_modalidad}`, item)
			.then((res) => {
				setmodalidades(newmodalidades)
				setIsOpenModal(false)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	const createItem = (item: ModelModalidadT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!modalidades) return
		axios.post(`/api/v1/modalidades`, item)
			.then((res) => {
				console.log({ res })
				setmodalidades([res.data, ...modalidades])
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
			{modalidades ? <div className="h-10/12">
				<div className="flex flex-col items-center justify-start h-full">
					<Table
						data={modalidades}
						columns={columns}
						Form={FormModalidades}
						createItem={createItem}
						updateItem={updateItem}
						deleteItem={removeItem}></Table>
				</div>
			</div> : <div className='h-10/12'>loading...</div>}
		</LayoutGeneral>
	);
};
export default PageModalidades