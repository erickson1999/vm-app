import { FC, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { ModelCicloT, ModelParticipanteT, ModelPlan_participanteT } from '../../../models'
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { FormsI } from '../FormsInteface'
import axios from 'axios'
import personas from '../../../pages/api/v1/personas'

const initialValues = {
    id_persona: "",
    certificado: "",
    estado: "activo",
    horas: "0"
}

export const FormMatriculas: FC<FormsI> = ({ item, createItem, updateItem, setIsOpenModal }) => {
    const [participantes, setParticipantes] = useState<ModelParticipanteT[]>()
    const getParticipantes = () => {
        axios.get("/api/v1/participantes").then((res) => {
            setParticipantes(res.data)
        })
    }


    useEffect(() => {
        getParticipantes()

    }, [])

    const onSubmit = (values: ModelPlan_participanteT) => {
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
                    < FormControl>
                        <InputLabel id="Participante">Participante</InputLabel>
                        <Select
                            label="Participante"
                            labelId="participante"
                            id="id_persona"
                            name="id_persona"
                            onChange={formik.handleChange}
                            value={formik.values.id_persona}
                        >
                            {participantes && participantes.map((participante) => {
                                return <MenuItem key={participante.id_persona} value={participante.id_persona}>{participante.nombre_completo}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    < FormControl>
                        <InputLabel id="Estado">
                            Estado
                        </InputLabel>
                        <Select
                            label="Estado"
                            labelId="estado"
                            id="estado"
                            name="estado"
                            onChange={formik.handleChange}
                            value={formik.values.estado}
                        >
                            <MenuItem value={"activo"}>Activo</MenuItem>
                            <MenuItem value={"inactivo"}>inactivo</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box className="flex justify-center"><Button type="submit" variant="outlined">Guardar</Button></Box>
            </Box>
        </form >
    )
}
