import { useContext, useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Button, ModalForRemove, SubTitle } from '../../components';
import { Table } from '../../components/Table';
import { UserI } from '../../components/Table/TableInterface';
import { ContextUI } from '../../context/ContextUI';
import { LayoutGeneral } from '../../layouts';
import axios from "axios"
import { ModelCicloT } from '../../models';
import { PageCiclosForm } from '../../components/Pages/PageCiclos';

const heads = ['id', 'Nombre', 'Alias'];

export interface CicloI {
	id_grupo: string;
	nombre: string;
	estado: string;
	alias: string
}

const Pageciclos = () => {
	const [ciclos, setCiclos] = useState<ModelCicloT[]>()
	const {
		modal: { setIsOpenModal, setContentModal },
	} = useContext(ContextUI);

	useEffect(() => {
		axios.get(`api/v1/ciclos`).then((res) => {
			setCiclos(res.data)
		}).catch((err) => { console.log({ err }) })
	}, []
	)
	const removeItem = (idItem: number) => {
		if (!ciclos) return
		const newCiclos = ciclos.filter((ciclo) => {
			return ciclo.id_ciclo !== idItem
		})
		axios.delete(`api/v1/ciclos/${idItem}`)
			.then((res) => {
				setIsOpenModal(false)
				setCiclos(newCiclos)
			})
			.catch((err) => { console.log({ err }) })

	}
	const updateItem = (item: ModelCicloT) => {
		console.log({ item })
		if (!ciclos) return
		const newCiclos = ciclos.map((ciclo) => {
			if (ciclo.id_ciclo !== item.id_ciclo) {
				return ciclo
			}
			return item

		})
		axios.put(`api/v1/ciclos/${item.id_ciclo}`, item)
			.then((res) => {
				setIsOpenModal(false)
				setCiclos(newCiclos)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	const createItem = (item: ModelCicloT) => {
		if (!ciclos) return
		axios.post(`api/v1/ciclos`, item)
			.then((res) => {
				setIsOpenModal(false)
				setCiclos([res.data, ...ciclos])
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
			{ciclos ? <div className="h-10/12">
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
							setContentModal(<PageCiclosForm createItem={createItem} />);
							setIsOpenModal(true);
						}}
					></Button>
					<Table
						data={ciclos}
						heads={heads}
						configs={{ numeration: true, align: 'text-center' }}
						options={{
							enabled: true,
							actions: (item: ModelCicloT) => {
								return (
									<>
										<AiOutlineEdit
											className="text-orange-500 cursor-pointer"
											onClick={() => {
												setContentModal(
													<PageCiclosForm itemData={item} updateItem={updateItem} />
												);
												setIsOpenModal(true);
											}}
										></AiOutlineEdit>
										<AiOutlineDelete
											className="text-red-500 cursor-pointer"
											onClick={() => {
												setContentModal(
													<ModalForRemove deleteItem={() => { removeItem(item.id_ciclo!) }} >
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
export default Pageciclos