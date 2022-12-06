import React, { useState } from "react"
import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect } from 'react'
import { ModelEscuela_sucursalT, ModelSucursalT } from '../../../models'
import { Table } from "../../../components"
import { FormEscuelasSucursal } from "../../../components/Forms"
import { TableGridColumnsI } from "../../../components/Table/TableInterfaces"


const columns: TableGridColumnsI[] = [{ name: "id_escuela", label: "Escuela", options: { filter: true, sort: true } },
{ name: "estado", label: "Estado", options: { filter: true, sort: true } },
]


const PageSucursal = () => {
    const [escuelasSucursal, setEscuelasSucursal] = useState<ModelEscuela_sucursalT[]>()
    const router = useRouter()
    useEffect(() => {
        if (router.query.id) {
            const id = router.query.id
            console.log(id)
            axios.get(`/api/v1/escuelasSucur/${id}`)
                .then((res) => {
                    console.log(res.data)
                    setEscuelasSucursal(res.data)
                }).catch((err) => { console.log({ err }) })
        }
    }, [router.query.id])

    const removeItem = (item: ModelEscuela_sucursalT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
        const idItem = item.id_escuela_sucursal
        if (!escuelasSucursal) return
        const newescuelasSucursal = escuelasSucursal.filter((escuelasSucursal) => {
            return escuelasSucursal.id_escuela_sucursal !== idItem
        })
        axios.delete(`/api/v1/escuelasSucur/${idItem}`)
            .then((res) => {
                setEscuelasSucursal(newescuelasSucursal)
                setIsOpenModal(false)
            })
            .catch((err) => { console.log({ err }) })

    }
    const updateItem = (item: ModelEscuela_sucursalT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (!escuelasSucursal) return
        const newescuelasSucursal = escuelasSucursal.map((escuelasSucursal) => {
            if (escuelasSucursal.id_escuela_sucursal !== item.id_escuela_sucursal) {
                return escuelasSucursal
            }
            return item
        })
        axios.put(`/api/v1/escuelasSucur/${item.id_escuela_sucursal}`, item)
            .then((res) => {
                setEscuelasSucursal(newescuelasSucursal)
                setIsOpenModal(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const createItem = (item: ModelEscuela_sucursalT, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (!escuelasSucursal) return
        axios.post(`/api/v1/escuelasSucur`, item)
            .then((res) => {
                console.log({ res })
                setEscuelasSucursal([res.data, ...escuelasSucursal])
                setIsOpenModal(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const viewDetails = (item: ModelEscuela_sucursalT) => {
        console.log({ router })
        router.push(`${router.asPath}/${item.id_escuela_sucursal}`)
    }
    return escuelasSucursal ? <Table
        data={escuelasSucursal}
        columns={columns}
        Form={FormEscuelasSucursal}
        deleteItem={removeItem}
        createItem={createItem}
        updateItem={updateItem} viewDetails={viewDetails}></Table > : <></>
}

export default PageSucursal



