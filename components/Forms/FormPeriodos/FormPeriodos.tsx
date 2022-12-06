import { FC } from 'react'
import { useFormik } from 'formik'
import { ModelPeriodoT } from '../../../models'
import { Box, Button, MenuItem, Select, TextField } from '@mui/material'
import { FormsI } from '../FormsInteface'

const initialValues = {
    nombre: "",
    estado: "activo",
}

export const FormPeriodos: FC<FormsI> = ({ item, createItem, updateItem, setIsOpenModal }) => {
    const onSubmit = (values: ModelPeriodoT) => {
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
                        label="Nombre Periodo"
                        name="nombre"
                        onChange={formik.handleChange}
                        value={formik.values.nombre}>
                    </TextField>
                    <Select
                        labelId="estado"
                        id="estado"
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
