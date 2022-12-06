import { useEffect, useState } from 'react';
import { useRouter } from "next/router"
import axios from "axios"

import { FormProgramas, Table } from '../../components';
import { LayoutGeneral } from '../../layouts';
import { ModelCargaPlan, ModelCargaPlanT, ModelVinculacionT } from '../../models';
import { TableGridColumnsI } from '../../components/Table/TableInterfaces';

const columns: TableGridColumnsI[] = [
	{ name: "nombrePersona", label: "Encargado", options: { filter: true, sort: true } },
	{ name: "nombreSucursal", label: "Sucursal", options: { filter: true, sort: true } },
	{ name: "nombreFacultad", label: "Facultad", options: { filter: true, sort: true } },
	{ name: "nombreEscuela", label: "Escuela", options: { filter: true, sort: true } },
	{ name: "nombreProyecto", label: "Proyecto", options: { filter: true, sort: true } },
	{ name: "nombreCiclo", label: "Ciclo", options: { filter: true, sort: true } },
	{ name: "nombreGrupo", label: "Grupo", options: { filter: true, sort: true } },
	{ name: "nombreModalidad", label: "Modalidad", options: { filter: true, sort: true } },
	{ name: "nombrePeriodo", label: "Periodo", options: { filter: true, sort: true } },
	{ name: "estado", label: "Estado", options: { filter: true, sort: true } },
]


const PageProgramas = () => {
	const [programas, setProgramas] = useState<ModelCargaPlanT[]>()

	const router = useRouter()

	const itemsForTable = (data: any[] | any) => {

		if (Array.isArray(data)) {
			return data.map((item: any) => {
				return {
					...item,
					nombrePersona: item.docente.codigo,
					nombreSucursal: item.sucursal.nombre,
					nombreFacultad: item.facultad.nombre,
					nombreEscuela: item.escuela.nombre,
					nombreProyecto: item.vinculacion.nombre,
					nombreCiclo: item.ciclo.nombre,
					nombreGrupo: item.grupo.nombre,
					nombreModalidad: item.modalidad.nombre,
					nombrePeriodo: item.periodo.nombre
				}
			})
		}
		return {
			...data, nombrePersona: data.docente.codigo,
			nombreSucursal: data.sucursal.nombre,
			nombreFacultad: data.facultad.nombre,
			nombreEscuela: data.escuela.nombre,
			nombreProyecto: data.vinculacion.nombre,
			nombreCiclo: data.ciclo.nombre,
			nombreGrupo: data.grupo.nombre,
			nombreModalidad: data.modalidad.nombre,
			nombrePeriodo: data.periodo.nombre
		}
	}

	useEffect(() => {
		axios.get(`/api/v1/carga_planes`).then((res) => {
			const parsertItems = itemsForTable(res.data)
			setProgramas(parsertItems)
		}).catch((err) => { console.log(err) })
	}, []
	)

	const removeItem = (item: ModelCargaPlanT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		const idItem = item.id_carga_plan
		if (!programas) return
		const newprogramas = programas.filter((programas) => {
			return programas.id_carga_plan !== idItem
		})
		axios.delete(`/api/v1/carga_planes/${idItem}`)
			.then((res) => {
				setProgramas(newprogramas)
				setIsOpenModal(false)
			})
			.catch((err) => { console.log({ err }) })

	}
	const updateItem = (item: ModelCargaPlanT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!programas) return
		axios.put(`/api/v1/carga_planes/${item.id_carga_plan}`, item)
			.then((res) => {
				const newProgramas = programas.map((programa) => {
					if (item.id_carga_plan !== programa.id_carga_plan) {
						return programa
					}
					return itemsForTable(res.data)
				})
				setProgramas(newProgramas)
				setIsOpenModal(false)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	const createItem = (item: ModelCargaPlanT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
		if (!programas) return
		axios.post(`/api/v1/carga_planes`, item)
			.then((res) => {
				const parserItem = itemsForTable(res.data)
				setProgramas([parserItem, ...programas])
				setIsOpenModal(false)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const viewDetails = (item:ModelCargaPlanT) => {
		const idCargaPlan = router.query.idCargaPlan
		router.push(`${router.asPath}/${item.id_carga_plan}`)
	}

	return (
		<LayoutGeneral
			footerHeight="h-1/12"
			navbarHeight="h-1/12"
			mainHeight="h-screen"
		>
			{programas ? <div className="h-10/12">
				<div className="flex flex-col items-center justify-start h-full w-full	">
					<Table
						data={programas}
						columns={columns}
						Form={FormProgramas}
						createItem={createItem}
						updateItem={updateItem}
						deleteItem={removeItem}
						viewDetails={viewDetails}
					></Table>
				</div>
			</div> : <div className='h-10/12'>loading...</div>}
		</LayoutGeneral>
	);
};
export default PageProgramas