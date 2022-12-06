import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { FormSesiones, Table, FormPlanParticipantes } from '../../components'
import { ModelAsistenciaT, ModelParticipanteT, ModelPlan_participanteT, ModelPlan_sesionT } from '../../models'
import { LayoutGeneral } from '../../layouts'
import { Button, FormGroup, Input, TextField } from '@mui/material'

const PageSesiones = () => {

    const columns = [
        { name: "codigo", label: "codigo", options: { filter: true, sort: true } },
        { name: "fecha_asis_pretty", label: "Fecha registro", options: { filter: true, sort: true } },
        // { name: "fecha_termino_pretty", label: "Fecha salida", options: { filter: true, sort: true } },
        { name: "estado", label: "Estado", options: { filter: true, sort: true } }]
    const [sesiones, setSesiones] = useState<ModelPlan_sesionT[]>()
    const [codeuser, setCodeUser] = useState()
    const [asistencias, setAsistencias] = useState<ModelAsistenciaT[]>()
    const router = useRouter()


    const onChange = (e: any) => {
        setCodeUser(e.target.value)

    }

    useEffect(() => {
        if (router.query.idCargaPlan) {
            const id = router.query.idCargaPlan
            axios.get(`/api/v1/asistencias`).then((res) => {
                console.log({ asistencias: res.data })
                setAsistencias(res.data)
            })
        }
    }, [router.query.idCargaPlan])

    const removeSesion = (item: ModelAsistenciaT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
        const idItem = item.id_asistencia
        if (!asistencias) return
        const newAsistencias = asistencias.filter((asistencia) => {
            return asistencia.id_asistencia !== idItem
        })
        axios.delete(`/api/v1/asistencias/${idItem}`)
            .then((res) => {
                setAsistencias(newAsistencias)
                setIsOpenModal(false)
            })
            .catch((err) => { console.log({ err }) })

    }
    const updateSesion = (item: ModelPlan_sesionT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (!sesiones) return
        axios.put(`/api/v1/asistencias/${item.id_plan_sesion}`, item)
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
        axios.post(`/api/v1/asistencias/`, newItem)
            .then((res) => {
                setSesiones([res.data, ...sesiones])
                setIsOpenModal(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const registrarAsistencia = () => {
        if (!codeuser) return
        axios.post(`/api/v1/asistencias/${codeuser}`)
            .then((res) => { console.log(res.data); setAsistencias([res.data, ...asistencias!]) }).catch((err) => { console.log(err) })
    }

    return asistencias ?
        <LayoutGeneral>
            <div className="w-full  flex flex-col items-center mt-5">
                <div className="flex flex-col gap-y-4">
                    <TextField onChange={onChange} name={"codeuser"} value={codeuser} placeholder="ingrese un código"></TextField><Button variant="outlined" onClick={registrarAsistencia}>Registrar asistencia</Button>
                </div>
                <Table
                    data={asistencias}
                    columns={columns}
                    Form={FormSesiones}
                    deleteItem={removeSesion}
                    createItem={createSesion}
                    updateItem={updateSesion}
                    viewButton={false}
                ></Table>
            </div>
        </LayoutGeneral> : <>Loading</>


}

export default PageSesiones