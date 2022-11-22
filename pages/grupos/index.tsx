import { useContext, useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Button, ModalForRemove, SubTitle } from '../../components';
import { Table } from '../../components/Table';
import { UserI } from '../../components/Table/TableInterface';
import { ContextUI } from '../../context/ContextUI';
import { LayoutGeneral } from '../../layouts';

import axios from "axios"
import { ModelGrupoT } from '../../models';
import { PageGruposForm } from '../../components/Pages/PageGrupos';


const heads = ['id', 'Nombre', 'estado', "grupo"];

export interface CicloI {
	id_grupo: string;
	nombre: string;
	estado: string;
	alias: string
}



const PageGrupos = () => {
	const [grupos, setGrupos] = useState<ModelGrupoT[]>()
	const {
		modal: { setIsOpenModal, setContentModal },
	} = useContext(ContextUI);

	useEffect(() => {
		axios.get(`api/v1/grupos`).then((res) => {
			setGrupos(res.data)
		}).catch((err) => { console.log({ err }) })
	}, []
	)
	const removeItem = (idItem: number) => {
		if (!grupos) return
		const newgrupos = grupos.filter((grupo) => {
			return grupo.id_grupo !== idItem
		})
		axios.delete(`api/v1/grupos/${idItem}`)
			.then((res) => {
				setIsOpenModal(false)
				setGrupos(newgrupos)
			})
			.catch((err) => { console.log({ err }) })

	}
	const updateItem = (item: ModelGrupoT) => {
		console.log({ item })
		if (!grupos) return
		const newgrupos = grupos.map((grupo) => {
			if (grupo.id_grupo !== item.id_grupo) {
				return grupo
			}
			return item

		})
		axios.put(`api/v1/grupos/${item.id_grupo}`, item)
			.then((res) => {
				setIsOpenModal(false)
				setGrupos(newgrupos)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const createItem = (item: ModelGrupoT) => {
		if (!grupos) return
		axios.post(`api/v1/grupos`, item)
			.then((res) => {
				setIsOpenModal(false)
				setGrupos([res.data, ...grupos])
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
							setContentModal(<PageGruposForm createItem={createItem} />);
							setIsOpenModal(true);
						}}
					></Button>
					<Table
						data={grupos}
						heads={heads}
						configs={{ numeration: true, align: 'text-center' }}
						options={{
							enabled: true,
							actions: (item: ModelGrupoT) => {
								return (
									<>
										<AiOutlineEdit
											className="text-orange-500 cursor-pointer"
											onClick={() => {
												setContentModal(
													<PageGruposForm itemData={item} updateItem={updateItem} />
												);
												setIsOpenModal(true);
											}}
										></AiOutlineEdit>
										<AiOutlineDelete
											className="text-red-500 cursor-pointer"
											onClick={() => {
												setContentModal(
													<ModalForRemove deleteItem={() => { removeItem(item.id_grupo!) }} >
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
export default PageGrupos