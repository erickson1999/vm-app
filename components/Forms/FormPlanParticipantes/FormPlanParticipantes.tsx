import { FC, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { ModelCicloT, ModelParticipanteT, ModelPlan_participanteT } from '../../../models'
import { Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { FormsI } from '../FormsInteface'
import axios from "axios"
const initialValues = {
    id_persona: "",
    estado: "activo"
}

export const FormPlanParticipantes: FC<FormsI> = ({ item, createItem, updateItem, setIsOpenModal }) => {
    const [participantes, setParticipantes] = useState<ModelParticipanteT[]>()
    const onSubmit = (values: ModelPlan_participanteT) => {
        updateItem && updateItem(values, setIsOpenModal);
        createItem && createItem(values, setIsOpenModal);
    }
    useEffect(() => {
        axios.get("/api/v1/participantes").then((res) => {
            setParticipantes(res.data)
        })
    }, [])
    const formik = useFormik({
        initialValues: item || initialValues,
        onSubmit
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <Box className='flex flex-col gap-y-3 '>
                <Box className='flex flex-col gap-y-3 '>
                    <FormControl>
                        <InputLabel id="idpersona">
                            participante
                        </InputLabel>
                        <Select
                            label="participante"
                            labelId="idpersona"
                            id="idpersona"
                            name="id_persona"
                            onChange={formik.handleChange}
                            value={formik.values.id_persona}
                        >
                            {participantes && participantes.map((participante) => {
                                return <MenuItem value={participante.id_persona}>{participante.codigo}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="estado">
                            estado
                        </InputLabel>
                        <Select
                            label="estado"
                            labelId="estado"
                            id="estado"
                            name="estado"
                            onChange={formik.handleChange}
                            value={formik.values.estado}
                        >
                            <MenuItem value="activo">activo</MenuItem>
                            <MenuItem value="inactivo">inactivo</MenuItem>
                        </Select>
                    </FormControl>


                </Box>
                <Box className="flex justify-center"><Button type="submit" variant="outlined">Guardar</Button></Box>
            </Box>
        </form>
    )
}
