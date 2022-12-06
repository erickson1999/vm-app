import { FC } from 'react'
import { useFormik } from 'formik'
import { ModelFacultadT, ModelPersonaT } from '../../../models'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { FormsI } from '../FormsInteface'

const initialValues = {
    nombre: "",
    appaterno: "",
    apmaterno: "",
    correo: "",
    direccion: "",
    dni: "",
    fecha_registro: "",
    numero: "",
    rol: "estudiante"
}

export const FormPersonas: FC<FormsI> = ({ item, createItem, updateItem, setIsOpenModal }) => {
    const onSubmit = (values: ModelPersonaT) => {
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
                        label="Nombre"
                        name="nombre"
                        onChange={formik.handleChange}
                        value={formik.values.nombre}>
                    </TextField>
                    <TextField
                        className='w-full'
                        variant="outlined"
                        label="Apellido paterno"
                        name="appaterno"
                        onChange={formik.handleChange}
                        value={formik.values.appaterno}>
                    </TextField>
                    <TextField
                        className='w-full'
                        variant="outlined"
                        label="Apellido materno"
                        name="apmaterno"
                        onChange={formik.handleChange}
                        value={formik.values.apmaterno}>
                    </TextField>
                    <TextField
                        className='w-full'
                        variant="outlined"
                        label="DNI"
                        name="dni"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.dni}>
                    </TextField>
                    <TextField
                        className='w-full'
                        variant="outlined"
                        label="Dirección"
                        name="direccion"
                        onChange={formik.handleChange}
                        value={formik.values.direccion}>
                    </TextField>
                    <TextField
                        className='w-full'
                        variant="outlined"
                        label="Correo"
                        name="correo"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.correo}>
                    </TextField>
                    <TextField
                        className='w-full'
                        variant="outlined"
                        label="Numero"
                        name="numero"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.numero}>
                    </TextField>
                    {!item && < FormControl>
                        <InputLabel id="Rol">
                            Rol
                        </InputLabel>
                        <Select
                            label="Estado"
                            labelId="Rol"
                            id="rol"
                            name="rol"
                            onChange={formik.handleChange}
                            value={formik.values.rol}
                        >
                            <MenuItem value={"estudiante"}>estudiante</MenuItem>
                            <MenuItem value={"docente"}>docente</MenuItem>
                        </Select>
                    </FormControl>}
                </Box>
                <Box className="flex justify-center"><Button type="submit" variant="outlined">Guardar</Button></Box>
            </Box>
        </form>
    )
}
