import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { ModelPlan_medioT, ModelVinculacionT } from '../../../models'
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { FormsI } from '../FormsInteface'
import axios from "axios"

export const FormPlanesMedios: FC<FormsI> = ({ item, createItem, updateItem, setIsOpenModal }) => {

    const router = useRouter()
    const idEscuelaSucursal = router.query.idEscuelaSucursal


    const initialValues = {
        id_escuela_sucursal: idEscuelaSucursal,
        id_vinculacion: ""
    }
    const [vinculaciones, setVinculaciones] = useState<ModelVinculacionT[]>()

    const onSubmit = (values: ModelPlan_medioT) => {
        updateItem && updateItem(values, setIsOpenModal);
        createItem && createItem(values, setIsOpenModal);
    }
    const getVinculaciones = () => {
        axios.get("/api/v1/vinculaciones").then((res) => { setVinculaciones(res.data) }).catch((err) => { })
    }



    useEffect(() => {
        getVinculaciones()
    }, [])

    const formik = useFormik({
        initialValues: item || initialValues,
        onSubmit
    })
    return (<form onSubmit={formik.handleSubmit}>
        <Box className='flex flex-col gap-y-3 '>
            <Box className='flex flex-col gap-y-3 '>
                <FormControl>
                    <InputLabel id="vinculacion">Vinculacion</InputLabel>
                    <Select
                        label="vinculacion"
                        labelId="vinculacion"
                        id="vinculacion"
                        name='id_vinculacion'
                        onChange={formik.handleChange}
                        value={formik.values.id_vinculacion}
                    >
                        {vinculaciones && vinculaciones.map((vinculacion) => {
                            return <MenuItem key={vinculacion.id_vinculacion} value={vinculacion.id_vinculacion}>{vinculacion.nombre}</MenuItem>
                        })
                        }
                    </Select>
                </FormControl>
            </Box>
            <Box className="flex justify-center"><Button type="submit" variant="outlined">Guardar</Button></Box>
        </Box>
    </form>)
}
