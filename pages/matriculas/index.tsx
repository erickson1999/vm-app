import { useContext, useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Button, ModalForRemove, SubTitle } from '../../components';
import { Table } from '../../components/Table';
import { UserI } from '../../components/Table/TableInterface';
import { ContextUI } from '../../context/ContextUI';
import { LayoutGeneral } from '../../layouts';
import { PageGruposForm } from '../../components/Pages/PageGrupo_last';


const heads = ['id', 'Estado', 'Nombre', "alias"];

export interface CicloI {
	id_grupo: string;
	nombre: string;
	estado: string;
	alias: string
}



const PageFacultades = () => {
	const [persons, setPersons] = useState<CicloI[]>()

	const {
		modal: { setIsOpenModal, setContentModal },
	} = useContext(ContextUI);

	useEffect(() => {
		fetch(`api/v1/facultades`, {
		}).then((resRaw) => resRaw.json()).then((res: CicloI[]) => { setPersons(res) })
	}, []
	)


	return (
		<LayoutGeneral
			footerHeight="h-1/12"
			navbarHeight="h-1/12"
			mainHeight="h-screen"
		>
			{persons ? <div className="h-10/12">
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
							setContentModal(<PageGruposForm />);
							setIsOpenModal(true);
						}}
					></Button>
					<Table
						data={persons}
						heads={heads}
						configs={{ numeration: true, align: 'text-center' }}
						options={{
							enabled: true,
							actions: (item: UserI) => {
								return (
									<>
										<AiOutlineEdit
											className="text-orange-500 cursor-pointer"
											onClick={() => {
												setContentModal(
													<PageGruposForm itemData={item} />
												);
												setIsOpenModal(true);
											}}
										></AiOutlineEdit>
										<AiOutlineDelete
											className="text-red-500 cursor-pointer"
											onClick={() => {
												setContentModal(
													<ModalForRemove deleteItem={() => { setIsOpenModal(false) }} >
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