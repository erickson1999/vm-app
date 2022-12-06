import { useEffect, useState } from 'react';

import axios from "axios"

import { FormCiclos, Table } from '../../components';
import { LayoutGeneral } from '../../layouts';
import { ModelCicloT } from '../../models';
import { TableGridColumnsI } from '../../components/Table/TableInterfaces';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const columns: TableGridColumnsI[] = [{ name: "nombre", label: "Nombre Ciclo", options: { filter: true, sort: true } },
{ name: "alias", label: "Alias Ciclo", options: { filter: true, sort: true } }]

const PageCiclos = () => {
	const [ciclos, setCiclos] = useState<ModelCicloT[]>()

	useEffect(() => {
		axios.get(`/api/v1/ciclos`).then((res) => {
			setCiclos(res.data)
		}).catch((err) => {
			toast("Ocurrio un error", { type: "error" })
		})
	}, []
	)

	const removeItem = (item: ModelCicloT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		const idItem = item.id_ciclo
		if (!ciclos) return
		const newciclos = ciclos.filter((ciclos) => {
			return ciclos.id_ciclo !== idItem
		})
		axios.delete(`/api/v1/ciclos/${idItem}`)
			.then((res) => {
				setCiclos(newciclos)
				setIsOpenModal(false)
				toast("Elemento eliminado correctamente", { type: "success" })
			})
			.catch((err) => {
				toast("Ocurrio un error", { type: "error" })
			})
	}
	const updateItem = (item: ModelCicloT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!ciclos) return
		const newciclos = ciclos.map((ciclos) => {
			if (ciclos.id_ciclo !== item.id_ciclo) {
				return ciclos
			}
			return item
		})
		axios.put(`/api/v1/ciclos/${item.id_ciclo}`, item)
			.then((res) => {
				setCiclos(newciclos)
				setIsOpenModal(false)
				toast("Elemento actualizado correctamente", { type: "success" })
			})
			.catch((err) => {
				toast("Ocurrio un error", { type: "error" })
			})
	}
	const createItem = (item: ModelCicloT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!ciclos) return
		axios.post(`/api/v1/ciclos`, item)
			.then((res) => {
				console.log(res)
				setCiclos([res.data, ...ciclos])
				setIsOpenModal(false)
				toast("Elemento creado correctamente", { type: "success" })
			})
			.catch((err) => {
				toast("Ocurrio un error", { type: "error" })
			})
	}
	return (
		<LayoutGeneral
			footerHeight="h-1/12"
			navbarHeight="h-1/12"
			mainHeight="h-screen"
		>
			{ciclos ? <div className="h-10/12">
				<div className="flex flex-col items-center justify-start h-full">
					<ToastContainer></ToastContainer>
					<Table
						data={ciclos}
						columns={columns}
						Form={FormCiclos}
						createItem={createItem}
						updateItem={updateItem}
						deleteItem={removeItem}></Table>
				</div>
			</div> : <div className='h-10/12'>loading...</div>}
		</LayoutGeneral>
	);
};
export default PageCiclos