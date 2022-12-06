import { useEffect, useState } from 'react';

import axios from "axios"

import { FormPeriodos, Table } from '../../components';
import { LayoutGeneral } from '../../layouts';
import { ModelPeriodoT } from '../../models';
import { TableGridColumnsI } from '../../components/Table/TableInterfaces';

const columns: TableGridColumnsI[] = [{ name: "nombre", label: "Nombre periodos", options: { filter: true, sort: true } },
{ name: "estado", label: "Estado periodos", options: { filter: true, sort: true } },
]

const PagePeriodos = () => {
	const [periodos, setperiodos] = useState<ModelPeriodoT[]>()
	useEffect(() => {
		axios.get(`api/v1/periodos`).then((res) => {
			setperiodos(res.data)
		}).catch((err) => { })
	}, []
	)

	const removeItem = (item: ModelPeriodoT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		const idItem = item.id_periodo
		if (!periodos) return
		const newperiodos = periodos.filter((periodos) => {
			return periodos.id_periodo !== idItem
		})
		axios.delete(`api/v1/periodos/${idItem}`)
			.then((res) => {
				setperiodos(newperiodos)
				setIsOpenModal(false)
			})
			.catch((err) => { console.log({ err }) })

	}
	const updateItem = (item: ModelPeriodoT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!periodos) return
		const newperiodos = periodos.map((periodos) => {
			if (periodos.id_periodo !== item.id_periodo) {
				return periodos
			}
			return item
		})
		axios.put(`api/v1/periodos/${item.id_periodo}`, item)
			.then((res) => {
				console.log({ updatePeriodo: res })
				setperiodos(newperiodos)
				setIsOpenModal(false)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	const createItem = (item: ModelPeriodoT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!periodos) return
		axios.post(`api/v1/periodos`, item)
			.then((res) => {
				console.log({ res })
				setperiodos([res.data, ...periodos])
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
			{periodos ? <div className="h-10/12">
				<div className="flex flex-col items-center justify-start h-full">
					<Table
						data={periodos}
						columns={columns}
						Form={FormPeriodos}
						createItem={createItem}
						updateItem={updateItem}
						deleteItem={removeItem}></Table>
				</div>
			</div> : <div className='h-10/12'>loading...</div>}
		</LayoutGeneral>
	);
};
export default PagePeriodos