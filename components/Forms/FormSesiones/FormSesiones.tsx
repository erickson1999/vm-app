import { FC } from 'react'
import { useFormik } from 'formik'
import { ModelCicloT, ModelPlan_sesion, ModelPlan_sesionT } from '../../../models'
import { Box, Button, TextField, FormLabel, InputLabel } from '@mui/material'
import { FormsI } from '../FormsInteface'

const initialValues = {
    detalle: "",
    fecha_sesion: "",
    fin_sesion: "",
    evidencia: "ninguna",
}

export const FormSesiones: FC<FormsI> = ({ item, createItem, updateItem, setIsOpenModal }) => {
    const onSubmit = (values: ModelPlan_sesionT) => {
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
                        required
                        className='w-full'
                        variant="outlined"
                        label="Detalle"
                        name="detalle"
                        onChange={formik.handleChange}
                        value={formik.values.detalle}>
                    </TextField>

                    <InputLabel>Fecha Inicio</InputLabel>
                    <TextField
                        className='w-full'
                        variant="outlined"
                        name="fecha_sesion"
                        type="datetime-local"
                        onChange={formik.handleChange}
                        value={formik.values.fecha_sesion}>
                    </TextField>
                    <InputLabel>Fecha fin</InputLabel>
                    <TextField
                        className='w-full'
                        variant="outlined"
                        type="datetime-local"
                        name="fin_sesion"
                        onChange={formik.handleChange}
                        value={formik.values.fin_sesion}>
                    </TextField>
                    <TextField
                        required
                        className='w-full'
                        variant="outlined"
                        label="Evidencias"
                        name="evidencia"
                        onChange={formik.handleChange}
                        value={formik.values.evidencia}>
                    </TextField>
                </Box>
                <Box className="flex justify-center"><Button type="submit" variant="outlined">Guardar</Button></Box>
            </Box>
        </form>
    )
}
