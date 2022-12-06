import { useEffect, useState } from 'react';

import axios from "axios"

import { FormGrupos, Table } from '../../components';
import { LayoutGeneral } from '../../layouts';
import { ModelGrupoT } from '../../models';
import { TableGridColumnsI } from '../../components/Table/TableInterfaces';

const columns: TableGridColumnsI[] = [{ name: "nombre", label: "Nombre Grupo", options: { filter: true, sort: true } },
{ name: "estado", label: "Estado grupo", options: { filter: true, sort: true } },
{ name: "alias", label: "Alias grupo", options: { filter: true, sort: true } }]

const Pagegrupos = () => {
	const [grupos, setGrupos] = useState<ModelGrupoT[]>()
	useEffect(() => {
		axios.get(`//api/v1/grupos`).then((res) => {
			setGrupos(res.data)
		}).catch((err) => { })
	}, []
	)

	const removeItem = (item: ModelGrupoT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		const idItem = item.id_grupo
		if (!grupos) return
		const newgrupos = grupos.filter((grupo) => {
			return grupo.id_grupo !== idItem
		})
		axios.delete(`/api/v1/grupos/${idItem}`)
			.then((res) => {
				setGrupos(newgrupos)
				setIsOpenModal(false)
			})
			.catch((err) => { console.log({ err }) })

	}
	const updateItem = (item: ModelGrupoT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!grupos) return
		const newgrupos = grupos.map((grupo) => {
			if (grupo.id_grupo !== item.id_grupo) {
				return grupo
			}
			return item
		})
		axios.put(`/api/v1/grupos/${item.id_grupo}`, item)
			.then((res) => {
				setGrupos(newgrupos)
				setIsOpenModal(false)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	const createItem = (item: ModelGrupoT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!grupos) return
		axios.post(`/api/v1/grupos`, item)
			.then((res) => {
				console.log({ res })
				setGrupos([res.data, ...grupos])
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
			{grupos ? <div className="h-10/12">
				<div className="flex flex-col items-center justify-start h-full">
					<Table
						data={grupos}
						columns={columns}
						Form={FormGrupos}
						createItem={createItem}
						updateItem={updateItem}
						deleteItem={removeItem}></Table>
				</div>
			</div> : <div className='h-10/12'>loading...</div>}
		</LayoutGeneral>
	);
};
export default Pagegrupos