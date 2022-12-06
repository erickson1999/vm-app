import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { FormSesiones, Table, FormPlanParticipantes } from '../../components'
import { ModelParticipanteT, ModelPlan_participanteT, ModelPlan_sesionT } from '../../models'
import { LayoutGeneral } from '../../layouts'

const PageSesiones = () => {
    const columnsSesiones = [
        { name: "fecha_sesion_pretty", label: "Fecha inicio", options: { filter: true, sort: true } },
        { name: "fin_sesion_pretty", label: "Fecha fin", options: { filter: true, sort: true } },
        { name: "detalle", label: "Detalles", options: { filter: true, sort: true } },
        { name: "evidencia", label: "Evidencias", options: { filter: true, sort: true } }]

    const columnsParticipantes = [
        { name: "codigo", label: "Código", options: { filter: true, sort: true } },
        { name: "estado", label: "Estado", options: { filter: true, sort: true } },
    ]

    const [sesiones, setSesiones] = useState<ModelPlan_sesionT[]>()
    const [participantes, setParticipantes] = useState<ModelPlan_participanteT[]>()
    const router = useRouter()
    useEffect(() => {
        if (router.query.idCargaPlan) {
            const id = router.query.idCargaPlan
            axios.get(`/api/v1/plansesiones/${id}`)
                .then((res) => {
                    setSesiones(res.data)
                }).catch((err) => { console.log({ err }) })

            axios.get(`/api/v1/planparticipantes/${id}`).then((res) => {
                setParticipantes(res.data)
            }).catch((err) => { })

        }
    }, [router.query.idCargaPlan])

    const removeSesion = (item: ModelPlan_sesionT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
        const idItem = item.id_plan_sesion
        if (!sesiones) return
        const newsesiones = sesiones.filter((sesiones) => {
            return sesiones.id_plan_sesion !== idItem
        })
        axios.delete(`/api/v1/plansesiones/${idItem}`)
            .then((res) => {
                setSesiones(newsesiones)
                setIsOpenModal(false)
            })
            .catch((err) => { console.log({ err }) })

    }
    const updateSesion = (item: ModelPlan_sesionT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (!sesiones) return
        axios.put(`/api/v1/plansesiones/${item.id_plan_sesion}`, item)
            .then((res) => {
                const newsesiones = sesiones.map((sesion) => {
                    if (item.id_plan_sesion !== sesion.id_plan_sesion) {
                        return sesion
                    }
                    return res.data
                })
                setSesiones(newsesiones)
                setIsOpenModal(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const createSesion = (item: ModelPlan_sesionT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
        const idCargaPlan = router.query.idCargaPlan
        const newItem = { ...item, id_carga_plan: idCargaPlan }
        if (!sesiones) return
        axios.post(`/api/v1/plansesiones`, newItem)
            .then((res) => {
                setSesiones([res.data, ...sesiones])
                setIsOpenModal(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    const removeParticipante = (item: ModelPlan_participanteT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
        const idItem = item.id_plan_participante
        if (!participantes) return
        const newParticipantes = participantes.filter((participante) => {
            return participante.id_plan_participante !== idItem
        })
        axios.delete(`/api/v1/planparticipantes/${idItem}`)
            .then((res) => {
                setParticipantes(newParticipantes)
                setIsOpenModal(false)
            })
            .catch((err) => { console.log({ err }) })

    }
    const updateParticipante = (item: ModelPlan_participanteT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (!participantes) return
        axios.put(`/api/v1/planparticipantes/${item.id_plan_participante}`, item)
            .then((res) => {
                const newParticipantes = participantes.map((participante) => {
                    if (item.id_plan_participante !== participante.id_plan_participante) {
                        return participante
                    }
                    return res.data
                })
                setParticipantes(newParticipantes)
                setIsOpenModal(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const createParticipante = (item: ModelPlan_participanteT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
        const idCargaPlan = router.query.idCargaPlan
        const newItem = { ...item, id_carga_plan: idCargaPlan }
        if (!participantes) return
        axios.post(`/api/v1/planparticipantes`, newItem)
            .then((res) => {
                console.log(res.data)
                setParticipantes([res.data, ...participantes])
                setIsOpenModal(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }




    return sesiones && participantes ?
        <LayoutGeneral>
            <div className="w-full  flex flex-col items-center">
                <Table
                    data={sesiones}
                    columns={columnsSesiones}
                    Form={FormSesiones}
                    deleteItem={removeSesion}
                    createItem={createSesion}
                    updateItem={updateSesion}></Table>

                <Table
                    data={participantes}
                    columns={columnsParticipantes}
                    Form={FormPlanParticipantes}
                    deleteItem={removeParticipante}
                    createItem={createParticipante}
                    updateItem={updateParticipante}></Table>
            </div>
        </LayoutGeneral> : <>Loading</>


}

export default PageSesiones