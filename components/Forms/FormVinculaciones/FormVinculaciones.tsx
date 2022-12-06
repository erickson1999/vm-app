import { FC } from 'react'
import { useFormik } from 'formik'
import { ModelVinculacionT } from '../../../models'
import { Box, Button, MenuItem, Select, TextField } from '@mui/material'
import { FormsI } from '../FormsInteface'

const initialValues = {
    nombre: "",
    detalle: "",
    tipo: "",
    archivo: "",
    estado: "activo",
}

export const FormVinculaciones: FC<FormsI> = ({ item, createItem, updateItem, setIsOpenModal }) => {
    const onSubmit = (values: ModelVinculacionT) => {
        updateItem && updateItem(values, setIsOpenModal);
        createItem && createItem(values, setIsOpenModal);
    }
    const formik = useFormik({
        initialValues: item || initialValues,
        onSubmit
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <Box className='flex flex-col gap-y-3 '>
                <Box className='flex flex-col gap-y-3 '>
                    <TextField
                        className='w-full'
                        variant="outlined"
                        label="Nombre vinculación"
                        name="nombre"
                        onChange={formik.handleChange}
                        value={formik.values.nombre}>
                    </TextField>
                    <TextField
                        className='w-full'
                        variant="outlined"
                        label="Detalle vinculación"
                        name="detalle"
                        onChange={formik.handleChange}
                        value={formik.values.detalle}>
                    </TextField>
                    <TextField
                        className='w-full'
                        variant="outlined"
                        label="Tipo vinculación"
                        name="tipo"
                        onChange={formik.handleChange}
                        value={formik.values.tipo}>
                    </TextField>
                    <TextField
                        className='w-full'
                        variant="outlined"
                        label="Archivo vinculación"
                        name="archivo"
                        onChange={formik.handleChange}
                        value={formik.values.archivo}>
                    </TextField>
                    <Select
                        labelId="estado-vinculacion"
                        id="estado-vinculacion"
                        name='estado'
                        onChange={formik.handleChange}
                        value={formik.values.estado}
                    >
                        <MenuItem value={"activo"}>activo</MenuItem>
                        <MenuItem value={"inactivo"}>inactivo</MenuItem>
                    </Select>


                </Box>
                <Box className="flex justify-center"><Button type="submit" variant="outlined">Guardar</Button></Box>
            </Box>
        </form>
    )
}
