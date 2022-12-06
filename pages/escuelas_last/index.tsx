import { useEffect, useState } from 'react';

import axios from "axios"

import { FormEscuelas, Table } from '../../components';
import { LayoutGeneral } from '../../layouts';
import { ModelEscuelaT } from '../../models';
import { TableGridColumnsI } from '../../components/Table/TableInterfaces';

const columns: TableGridColumnsI[] =
	[{ name: "nombre", label: "Nombre Escuela", options: { filter: true, sort: true } },
	{ name: "estado", label: "Estado Escuela", options: { filter: true, sort: true } },
	{ name: "nombreFacultad", label: "Facultad", options: { filter: true, sort: true } }]

const PageEscuelas = () => {
	const [facultades, setFacultades] = useState<ModelEscuelaT[]>()
	const [escuelas, setEscuelas] = useState<ModelEscuelaT[]>()
	useEffect(() => {
		axios.get(`/api/v1/escuelas`).then((res) => {
			const escuelasWithFacultad = res.data.map((res: any) => {
				return { ...res, nombreFacultad: res.facultad.nombre }
			})
			setEscuelas(escuelasWithFacultad)
		}).catch((err) => { })

		axios.get("/api/v1/facultades").then((res) => {
			setFacultades(res.data)
		}).catch(() => { })

	}, []

	)
	const removeItem = (item: ModelEscuelaT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		console.log(item)
		const idItem = item.id_escuela
		if (!escuelas) return
		const newescuelas = escuelas.filter((escuela) => {
			return escuela.id_escuela !== idItem
		})
		axios.delete(`/api/v1/escuelas/${idItem}`)
			.then((res) => {
				setEscuelas(newescuelas)
				setIsOpenModal(false)
			})
			.catch((err) => { console.log({ err }) })

	}
	const updateItem = (item: ModelEscuelaT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!escuelas) return
		const newescuelas = escuelas.map((escuela: ModelEscuelaT) => {
			if (escuela.id_escuela !== item.id_escuela) {
				return escuela
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
				const escuelaWithFacultad = { ...res.data, nombreFacultad: res.data.facultad.nombre }
				console.log({ escuelaWithFacultad })
				setEscuelas([escuelaWithFacultad, ...escuelas])
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