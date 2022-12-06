import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { ModelEscuelaT, ModelEscuela_sucursalT, ModelSucursalT } from '../../../models'
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { FormsI } from '../FormsInteface'
import axios from "axios"

export const FormEscuelasSucursal: FC<FormsI> = ({ item, createItem, updateItem, setIsOpenModal }) => {

    const router = useRouter()
    const id = router.query.id

    const initialValues = {
        estado: "activo",
        id_escuela: "",
        id_sucursal: id
    }
    const [escuelas, setEscuelas] = useState<ModelEscuelaT[]>()
    const [sucursales, setSucursales] = useState<ModelSucursalT[]>()

    const onSubmit = (values: ModelEscuela_sucursalT) => {
        updateItem && updateItem(values, setIsOpenModal);
        createItem && createItem(values, setIsOpenModal);
    }
    const getEscuelas = () => {
        axios.get("/api/v1/escuelas").then((res) => { setEscuelas(res.data) }).catch((err) => { })
    }
    const getSucursales = () => {
        axios.get("/api/v1/sucursales").then((res) => { setSucursales(res.data) }).catch((err) => { })
    }
    useEffect(() => {
        getEscuelas()
        getSucursales()
    }, [])

    const formik = useFormik({
        initialValues: item || initialValues,
        onSubmit
    })
    return (<form onSubmit={formik.handleSubmit}>
        <Box className='flex flex-col gap-y-3 '>
            <Box className='flex flex-col gap-y-3 '>
                <FormControl>
                    <InputLabel id="escuela">Escuela</InputLabel>
                    <Select
                        label="escuela"
                        labelId="escuela"
                        id="id_escuela"
                        name='id_escuela'
                        onChange={formik.handleChange}
                        value={formik.values.id_escuela}
                    >
                        {escuelas && escuelas.map((escuela) => {
                            return <MenuItem key={escuela.id_escuela} value={escuela.id_escuela}>{escuela.nombre}</MenuItem>
                        })
                        }
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="sucursal">Sucursal</InputLabel>
                    <Select
                        label="sucursal"
                        labelId="sucursal"
                        id="id_sucursal"
                        name='id_sucursal'
                        onChange={formik.handleChange}
                        value={formik.values.id_sucursal}
                        readOnly
                    >
                        {sucursales && sucursales.map((sucursal) => {
                            return <MenuItem key={sucursal.id_sucursal} value={sucursal.id_sucursal}>{sucursal.nombre}</MenuItem>
                        })
                        }
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="estado">Estado</InputLabel>
                    <Select
                        labelId="estado"
                        id="estado"
                        name='estado'
                        label="Estado"
                        onChange={formik.handleChange}
                        value={formik.values.estado}
                    >
                        <MenuItem value={"activo"}>activo</MenuItem>
                        <MenuItem value={"inactivo"}>inactivo</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box className="flex justify-center"><Button type="submit" variant="outlined">Guardar</Button></Box>
        </Box>
    </form>)
}
