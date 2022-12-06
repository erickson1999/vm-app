import { FC, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { ModelEscuelaT, ModelFacultadT } from '../../../models'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { FormsI } from '../FormsInteface'
import axios from "axios"

const initialValues = {
    nombre: "",
    estado: "activo",
}

export const FormEscuelas: FC<FormsI> = ({ item, createItem, updateItem, setIsOpenModal }) => {
    const [facultades, setFacultades] = useState<ModelFacultadT[]>()
    const onSubmit = (values: ModelEscuelaT) => {
        updateItem && updateItem(values, setIsOpenModal);
        createItem && createItem(values, setIsOpenModal);
    }
    const getFacultades = () => {
        axios.get("/api/v1/facultades").then((res) => { setFacultades(res.data) }).catch((err) => { })
    }
    useEffect(() => {
        getFacultades()
    }, [])

    const formik = useFormik({
        initialValues: item || initialValues,
        onSubmit
    })
    return <form onSubmit={formik.handleSubmit}>
        <Box className='flex flex-col gap-y-3 '>
            <Box className='flex flex-col gap-y-3 '>
                <TextField
                    className='w-full'
                    variant="outlined"
                    label="Nombre Escuela"
                    name="nombre"
                    onChange={formik.handleChange}
                    value={formik.values.nombre}>
                </TextField>
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
    </form>
}
