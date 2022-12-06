import { useEffect, useState } from 'react';

import axios from "axios"

import { FormSucursales, Table } from '../../components';
import { LayoutGeneral } from '../../layouts';
import { ModelSucursalT } from '../../models';
import { TableGridColumnsI } from '../../components/Table/TableInterfaces';
import { useRouter } from 'next/router';

const columns: TableGridColumnsI[] = [{ name: "nombre", label: "Nombre sucursal", options: { filter: true, sort: true } },
{ name: "estado", label: "Estado sucursal", options: { filter: true, sort: true } },
]

const PageSucursales = () => {
	const [sucursales, setSucursales] = useState<ModelSucursalT[]>()
	const router = useRouter()


	useEffect(() => {
		axios.get(`/api/v1/sucursales`).then((res) => {
			setSucursales(res.data)
		}).catch((err) => { })
	}, []
	)

	const removeItem = (item: ModelSucursalT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		const idItem = item.id_sucursal
		if (!sucursales) return
		const newsucursales = sucursales.filter((sucursales) => {
			return sucursales.id_sucursal !== idItem
		})
		axios.delete(`/api/v1/sucursales/${idItem}`)
			.then((res) => {
				setSucursales(newsucursales)
				setIsOpenModal(false)
			})
			.catch((err) => { console.log({ err }) })

	}
	const updateItem = (item: ModelSucursalT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!sucursales) return
		const newsucursales = sucursales.map((sucursales) => {
			if (sucursales.id_sucursal !== item.id_sucursal) {
				return sucursales
			}
			return item
		})
		axios.put(`/api/v1/sucursales/${item.id_sucursal}`, item)
			.then((res) => {
				setSucursales(newsucursales)
				setIsOpenModal(false)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	const createItem = (item: ModelSucursalT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!sucursales) return
		axios.post(`/api/v1/sucursales`, item)
			.then((res) => {
				console.log({ res })
				setSucursales([res.data, ...sucursales])
				setIsOpenModal(false)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	// const viewDetails = (item: ModelSucursalT) => {
	// 	router.push(`sucursales/${item.id_sucursal}`)
	// }

	return (
		<LayoutGeneral
			footerHeight="h-1/12"
			navbarHeight="h-1/12"
			mainHeight="h-screen"
		>
			{sucursales ? <div className="h-10/12">
				<div className="flex flex-col items-center justify-start h-full">
					<Table
						data={sucursales}
						columns={columns}
						Form={FormSucursales}
						createItem={createItem}
						updateItem={updateItem}
						deleteItem={removeItem} ></Table>

				</div>
			</div> : <div className='h-10/12'>loading...</div>}
		</LayoutGeneral>
	);
};
export default PageSucursales