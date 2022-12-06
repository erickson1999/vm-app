import { FC, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { v4 as uuid } from "uuid"

import { ModelCargaPlanT, ModelCicloT, ModelDocenteT, ModelEscuelaT, ModelFacultadT, ModelGrupoT, ModelModalidadT, ModelPeriodo, ModelPeriodoT, ModelSucursalT, ModelVinculacionT } from '../../../models'
import { Box, Button, MenuItem, Select, TextField, FormControl, InputLabel } from '@mui/material'
import { FormsI } from '../FormsInteface'

import axios from 'axios'

const initialValues = {
    id_persona: "",
    id_periodo: "",
    id_modalidad: "",
    id_ciclo: "",
    id_grupo: "",
    estado: "activo",
    id_escuela: "",
    id_sucursal: "",
    id_facultad: "",
    id_vinculacion: "",
}


export const FormProgramas: FC<FormsI> = ({ item, createItem, updateItem, setIsOpenModal }) => {


    const [docentes, setDocentes] = useState<ModelDocenteT[]>()
    const [ciclos, setCiclos] = useState<ModelCicloT[]>()
    const [grupos, setGrupos] = useState<ModelGrupoT[]>()
    const [modalidades, setModalidades] = useState<ModelModalidadT[]>()
    const [periodos, setPeriodos] = useState<ModelPeriodoT[]>()
    const [sucursales, setSucursales] = useState<ModelSucursalT[]>()
    const [escuelas, setEsculeas] = useState<ModelEscuelaT[]>()
    const [facultades, setFacultades] = useState<ModelFacultadT[]>()
    const [vinculaciones, setVinculaciones] = useState<ModelVinculacionT[]>()


    const getDocentes = () => {
        axios.get("/api/v1/docentes").then((res) => { setDocentes(res.data) }).catch((err) => { })
    }
    const getCiclos = () => {
        axios.get("/api/v1/ciclos").then((res) => { setCiclos(res.data) }).catch((err) => { })
    }
    const getGrupos = () => {
        axios.get("/api/v1/grupos").then((res) => { setGrupos(res.data) }).catch((err) => { })
    }
    const getModalidades = () => {
        axios.get("/api/v1/modalidades").then((res) => { setModalidades(res.data) }).catch((err) => { })
    }
    const getPeriodos = () => {
        axios.get("/api/v1/periodos").then((res) => { setPeriodos(res.data) }).catch((err) => { })
    }
    const getSucursales = () => {
        axios.get("/api/v1/sucursales").then((res) => { setSucursales(res.data) }).catch((err) => { })
    }
    const getEscuelas = () => {
        axios.get("/api/v1/escuelas").then((res) => { setEsculeas(res.data) }).catch((err) => { })
    }
    const getFacultades = () => {
        axios.get("/api/v1/facultades").then((res) => { setFacultades(res.data) }).catch((err) => { })
    }
    const getVinculaciones = () => {
        axios.get("/api/v1/vinculaciones").then((res) => { setVinculaciones(res.data) }).catch((err) => { })
    }

    useEffect(() => {
        getDocentes()
        getCiclos()
        getGrupos()
        getModalidades()
        getPeriodos()
        getSucursales()
        getEscuelas()
        getFacultades()
        getVinculaciones()
    }, [])

    const onSubmit = (values: ModelCargaPlanT) => {
        updateItem && updateItem(values, setIsOpenModal);
        createItem && createItem(values, setIsOpenModal);
    }
    const formik = useFormik({
        initialValues: item || initialValues,
        onSubmit
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <Box className='flex gap-x-2 mb-4'>
                <Box className='flex w-1/2 flex-col gap-y-3'>
                    <FormControl>
                        <InputLabel id="persona">Encargado</InputLabel>
                        <Select
                            label="Encargado"
                            labelId="persona"
                            id="persona"
                            name='id_persona'
                            onChange={formik.handleChange}
                            value={formik.values.id_persona}
                        >
                            {docentes && docentes.map((docente) => {
                                return <MenuItem key={docente.id_persona} value={docente.id_persona}>{docente.codigo}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="sucursal">Sucursal</InputLabel>
                        <Select
                            label="Sucursal"
                            labelId="sucursal"
                            id="sucursal"
                            name='id_sucursal'
                            onChange={formik.handleChange}
                            value={formik.values.id_sucursal}
                        >
                            {sucursales && sucursales.map((sucursal) => {
                                return <MenuItem key={sucursal.id_sucursal} value={sucursal.id_sucursal}>{sucursal.nombre}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="facultad">Facultad</InputLabel>
                        <Select
                            label="Facultad"
                            labelId="facultad"
                            id="facultad"
                            name='id_facultad'
                            onChange={formik.handleChange}
                            value={formik.values.id_facultad}
                        >
                            {facultades && facultades.map((facultad) => {
                                return <MenuItem key={facultad.id_facultad} value={facultad.id_facultad}>{facultad.nombre}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="escuela">Escuela</InputLabel>
                        <Select
                            label="Escuela"
                            labelId="escuela"
                            id="escuela"
                            name='id_escuela'
                            onChange={formik.handleChange}
                            value={formik.values.id_escuela}
                        >
                            {escuelas && escuelas.map((escuela) => {
                                return <MenuItem key={escuela.id_escuela} value={escuela.id_escuela}>{escuela.nombre}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="vinculacion">Proyecto</InputLabel>
                        <Select
                            label="Proyecto"
                            labelId="vinculacion"
                            id="vinculacion"
                            name='id_vinculacion'
                            onChange={formik.handleChange}
                            value={formik.values.id_vinculacion}
                        >
                            {vinculaciones && vinculaciones.map((vinculacion) => {
                                return <MenuItem key={vinculacion.id_vinculacion} value={vinculacion.id_vinculacion}>{vinculacion.nombre}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <Box className='flex w-1/2 flex-col gap-y-3 '>
                    <FormControl>
                        <InputLabel id="ciclo">Ciclo</InputLabel>
                        <Select
                            label="Ciclo"
                            labelId="ciclo"
                            id="ciclo"
                            name='id_ciclo'
                            onChange={formik.handleChange}
                            value={formik.values.id_ciclo}
                        >
                            {ciclos && ciclos.map((ciclo) => {
                                return <MenuItem key={ciclo.id_ciclo} value={ciclo.id_ciclo}>{ciclo.nombre}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="grupo">Grupo</InputLabel>
                        <Select
                            label="Grupo"
                            labelId="grupo"
                            id="grupo"
                            name="id_grupo"
                            onChange={formik.handleChange}
                            value={formik.values.id_grupo}
                        >
                            {grupos && grupos.map((grupo) => {
                                return <MenuItem key={grupo.id_grupo} value={grupo.id_grupo}>{grupo.nombre}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="modalidad">Modalidad</InputLabel>
                        <Select
                            label="Modalidad"
                            labelId="modalidad"
                            id="modalidad"
                            name="id_modalidad"
                            onChange={formik.handleChange}
                            value={formik.values.id_modalidad}
                        >
                            {modalidades && modalidades.map((modalidad) => {
                                return <MenuItem key={modalidad.id_modalidad} value={modalidad.id_modalidad}>{modalidad.nombre}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="periodo">Periodo</InputLabel>
                        <Select
                            label="Periodo"
                            labelId="periodo"
                            id="periodo"
                            name='id_periodo'
                            onChange={formik.handleChange}
                            value={formik.values.id_periodo}
                        >
                            {periodos && periodos.map((periodo) => {
                                return <MenuItem key={periodo.id_periodo} value={periodo.id_periodo}>{periodo.nombre}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="estado">Estado</InputLabel>
                        <Select
                            label="Estado"
                            labelId="Estado"
                            id="periodo"
                            name='estado'
                            onChange={formik.handleChange}
                            value={formik.values.estado}
                        >
                            <MenuItem key={uuid()} value={"activo"}>activo</MenuItem>
                            <MenuItem key={uuid()} value={"inactivo"}>inactivo</MenuItem>
                        </Select>
                    </FormControl>

                </Box>
            </Box>
            <Box className="flex justify-center"><Button type="submit" variant="outlined">Guardar</Button></Box>
        </form>
    )
}
