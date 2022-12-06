import { useEffect, useState } from 'react';

import axios from "axios"

import { FormEscuelas, Table } from '../../components';
import { LayoutGeneral } from '../../layouts';
import { ModelEscuelaT } from '../../models';
import { TableGridColumnsI } from '../../components/Table/TableInterfaces';

const columns: TableGridColumnsI[] = [{ name: "nombre", label: "Nombre escuelas", options: { filter: true, sort: true } },
{ name: "estado", label: "Estado escuelas", options: { filter: true, sort: true } }]

const PageEscuelas = () => {
	const [escuelas, setEscuelas] = useState<ModelEscuelaT[]>()
	useEffect(() => {
		axios.get(`/api/v1/escuelas`).then((res) => {
			setEscuelas(res.data)
		}).catch((err) => { })
	}, []
	)

	const removeItem = (item: ModelEscuelaT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		const idItem = item.id_escuela
		if (!escuelas) return
		const newescuelas = escuelas.filter((escuelas) => {
			return escuelas.id_escuela !== idItem
		})
		axios.delete(`/api/v1/escuelas/${idItem}`)
			.then((res) => {
				setEscuelas(newescuelas)
				setIsOpenModal(false)
			})
			.catch((err) => { console.log({ err }) })

	}
	const updateItem = (item: ModelEscuelaT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		console.log({ item })
		if (!escuelas) return
		const newescuelas = escuelas.map((escuelas) => {
			if (escuelas.id_escuela !== item.id_escuela) {
				return escuelas
			}
			return item
		})
		axios.put(`/api/v1/escuelas/${item.id_escuela}`, item)
			.then((res) => {
				setEscuelas(newescuelas)
				setIsOpenModal(false)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	const createItem = (item: ModelEscuelaT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!escuelas) return
		axios.post(`/api/v1/escuelas`, item)
			.then((res) => {
				console.log({ res })
				setEscuelas([res.data, ...escuelas])
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
			{escuelas ? <div className="h-10/12">
				<div className="flex flex-col items-center justify-start h-full">
					<Table
						data={escuelas}
						columns={columns}
						Form={FormEscuelas}
						createItem={createItem}
						updateItem={updateItem}
						deleteItem={removeItem}></Table>
				</div>
			</div> : <div className='h-10/12'>loading...</div>}
		</LayoutGeneral>
	);
};
export default PageEscuelas