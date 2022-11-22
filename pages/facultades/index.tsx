import { useContext, useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Button, ModalForRemove, SubTitle } from '../../components';
import { Table } from '../../components/Table';
import { UserI } from '../../components/Table/TableInterface';
import { ContextUI } from '../../context/ContextUI';
import { LayoutGeneral } from '../../layouts';
import { PageGruposForm } from '../../components/Pages/PageGrupo_last';
import axios from "axios"
import { ModelFacultadT, ModelPersonaT } from '../../models';
import { PageFacultadesForm } from '../../components/Pages/PageFacultades';

const heads = ['id', 'Estado', 'Nombre', "alias"];

export interface CicloI {
	id_grupo: string;
	nombre: string;
	estado: string;
	alias: string
}



const PageFacultades = () => {
	const [facultades, setFacultades] = useState<ModelFacultadT[]>()

	const {
		modal: { setIsOpenModal, setContentModal },
	} = useContext(ContextUI);

	useEffect(() => {
		axios.get(`api/v1/facultades`).then((res) => {
			setFacultades(res.data)
		}).catch((err) => { })
	}, []
	)

	const removeItem = (idItem: number) => {
		if (!facultades) return
		const newFacultades = facultades.filter((facultad) => {
			return facultad.id_facultad !== idItem
		})
		axios.delete(`api/v1/facultades/${idItem}`)
			.then((res) => {
				setIsOpenModal(false)
				setFacultades(newFacultades)
			})
			.catch((err) => { console.log({ err }) })

	}
	const updateItem = (item: ModelFacultadT) => {
		if (!facultades) return
		const newfacultades = facultades.map((facultad) => {
			if (facultad.id_facultad !== item.id_facultad) {
				return facultad
			}
			return item

		})
		axios.put(`api/v1/facultades/${item.id_facultad}`, item)
			.then((res) => {
				setIsOpenModal(false)
				setFacultades(newfacultades)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	const createItem = (item: ModelFacultadT) => {
		if (!facultades) return
		axios.post(`api/v1/facultades`, item)
			.then((res) => {
				console.log({ res })
				setIsOpenModal(false)
				setFacultades([res.data, ...facultades])
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
				<div className="flex flex-col items-center justify-center h-full">
					<Button
						background={'bg-primary'}
						text={'Nuevo ciclo +'}
						padding={'px-4 py-2'}
						rounded={'rounded-full'}
						colorText={'text-white'}
						className={
							'font-bold my-1 border hover:border-primary hover:bg-white transition-all hover:text-primary ease-in'
						}
						onClick={() => {
							setContentModal(<PageFacultadesForm createItem={createItem} />);
							setIsOpenModal(true);
						}}
					></Button>
					<Table
						data={facultades}
						heads={heads}
						configs={{ numeration: true, align: 'text-center' }}
						options={{
							enabled: true,
							actions: (item: ModelFacultadT) => {
								return (
									<>
										<AiOutlineEdit
											className="text-orange-500 cursor-pointer"
											onClick={() => {
												setContentModal(
													<PageFacultadesForm itemData={item} updateItem={updateItem} />
												);
												setIsOpenModal(true);
											}}
										></AiOutlineEdit>
										<AiOutlineDelete
											className="text-red-500 cursor-pointer"
											onClick={() => {
												setContentModal(
													<ModalForRemove deleteItem={() => { removeItem(item.id_facultad!) }} >
														<SubTitle className='font-semibold text-black'>{`Eliminar a: este item`}</SubTitle>
													</ModalForRemove>
												);
												setIsOpenModal(true);
											}}
										></AiOutlineDelete>
									</>
								);
							},
						}}
					></Table>
				</div>
			</div> : <div className='h-10/12'>loading...</div>}
		</LayoutGeneral>
	);
};
export default PageFacultades