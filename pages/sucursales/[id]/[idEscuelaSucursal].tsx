import { useEffect, useState } from 'react';

import axios from "axios"

import { Table, FormPlanesMedios } from '../../../components';
import { LayoutGeneral } from '../../../layouts';
import { ModelPlan_medioT } from '../../../models';
import { TableGridColumnsI } from '../../../components/Table/TableInterfaces';
import { useRouter } from 'next/router';

const columns: TableGridColumnsI[] = [{ name: "id_escuela_sucursal", label: "Nombre Escuela", options: { filter: true, sort: true } },
{ name: "id_vinculacion", label: "Nombre vinculacion", options: { filter: true, sort: true } }
]

const Pageplanmedios = () => {
    const router = useRouter()
    const idEscuelaSucursal = router.query.idEscuelaSucursal
    console.log({ router })
    const [planmedios, setPlanMedios] = useState<ModelPlan_medioT[]>()
    useEffect(() => {
        if (idEscuelaSucursal) {
            axios.get(`/api/v1/planmedios/${idEscuelaSucursal}`).then((res) => {
                console.log({ res })
                setPlanMedios(res.data)
            }).catch((err) => { })
        }
    }, [idEscuelaSucursal]
    )

    const removeItem = (item: ModelPlan_medioT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
        const idItem = item.id_vinculacion
        if (!planmedios) return
        const newplanmedios = planmedios.filter((planmedios) => {
            return planmedios.id_vinculacion !== idItem
        })
        axios.delete(`/api/v1/planmedios/${idItem}`)
            .then((res) => {
                setPlanMedios(newplanmedios)
                setIsOpenModal(false)
            })
            .catch((err) => { console.log({ err }) })

    }
    const updateItem = (item: ModelPlan_medioT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (!planmedios) return
        const newplanmedios = planmedios.map((planmedios) => {
            if (planmedios.id_vinculacion !== item.id_vinculacion) {
                return planmedios
            }
            return item
        })
        axios.put(`/api/v1/planmedios/${item.id_vinculacion}`, item)
            .then((res) => {
                setPlanMedios(newplanmedios)
                setIsOpenModal(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const createItem = (item: ModelPlan_medioT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
        console.log("flag")
        console.log({ item })
        if (!planmedios) return


        axios.post(`/api/v1/planmedios`, item)
            .then((res) => {
                console.log({ res })
                setPlanMedios([res.data, ...planmedios])
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
            {planmedios ? <div className="h-10/12">
                <div className="flex flex-col items-center justify-start h-full w-full	">
                    <Table
                        data={planmedios}
                        columns={columns}
                        Form={FormPlanesMedios}
                        createItem={createItem}
                        updateItem={updateItem}
                        deleteItem={removeItem}></Table>
                </div>
            </div> : <div className='h-10/12'>loading...</div>}
        </LayoutGeneral>
    );
};
export default Pageplanmedios