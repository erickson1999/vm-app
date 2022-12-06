import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { FormMatriculas, Table } from '../../components'
import { ModelPlan_participanteT } from '../../models'

const Pagematriculas = () => {
    const columns = [
        { name: "nombre_completo", label: "Persona", options: { filter: true, sort: true } },
        { name: "estado", label: "Estado", options: { filter: true, sort: true } },
        { name: "horas", label: "Horas", options: { filter: true, sort: true } },]
    const [matriculas, setMatriculas] = useState<ModelPlan_participanteT[]>()
    const router = useRouter()
    useEffect(() => {
        if (router.query.idCargaPlan) {
            const id = router.query.idCargaPlan
            console.log(id)
            axios.get(`/api/v1/planparticipantes/${id}`)
                .then((res) => {
                    console.log({ res })
                    setMatriculas(res.data)
                }).catch((err) => { console.log({ err }) })
        }
    }, [router.query.id])


    const removeItem = (item: ModelPlan_participanteT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
        const idItem = item.id_plan_participante
        if (!matriculas) return
        const newmatriculas = matriculas.filter((matriculas) => {
            return matriculas.id_plan_participante !== idItem
        })
        axios.delete(`/api/v1/planparticipantes/${idItem}`)
            .then((res) => {
                setMatriculas(newmatriculas)
                setIsOpenModal(false)
            })
            .catch((err) => { console.log({ err }) })

    }
    const updateItem = (item: ModelPlan_participanteT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (!matriculas) return
        axios.put(`/api/v1/planparticipantes/${item.id_plan_participante}`, item)
            .then((res) => {
                const newmatriculas = matriculas.map((programa) => {
                    if (item.id_plan_participante !== programa.id_plan_participante) {
                        return programa
                    }
                    return item
                })
                setMatriculas(newmatriculas)
                setIsOpenModal(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const createItem = (item: ModelPlan_participanteT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
        console.log({ createitem: item })
        const idCargaPlan = router.query.idCargaPlan
        const newItem = { ...item, id_carga_plan: idCargaPlan }
        if (!matriculas) return
        axios.post(`/api/v1/planparticipantes`, newItem)
            .then((res) => {
                setMatriculas([item, ...matriculas])
                setIsOpenModal(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return matriculas ? <Table
        data={matriculas}
        columns={columns}
        Form={FormMatriculas}
        deleteItem={removeItem}
        createItem={createItem}
        updateItem={updateItem}></Table> : <>Loading</>


}

export default Pagematriculas