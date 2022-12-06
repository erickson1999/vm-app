import React, { FC, useState, useMemo } from "react";
import MUIDataTable from "mui-datatables";
import { CloseOutlined } from '@mui/icons-material';
import { Box, Modal, Button, Typography } from "@mui/material";
import { EditOutlined, DeleteOutlineOutlined, VisibilityOutlined } from '@mui/icons-material';
import { TableGridI } from "./TableInterfaces";


export const Table: FC<TableGridI> = ({ data, columns, deleteItem, Form, createItem, updateItem, viewDetails, viewButton = true, actions = true }) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [contentModal, setContentModal] = useState(<></>)
    const DeleteItemModal: FC<{ item: any }> = ({ item }) => {
        return (
            <Box className="flex flex-col gap-y-4"><Box className=" flex justify-center">
                <Typography>
                    ¿Deseas eliminar este item?
                </Typography>
            </Box>
                <Box className="flex justify-center gap-x-2">
                    <Button variant="outlined" color="success" onClick={(e) => { e.preventDefault(); deleteItem(item, setIsOpenModal) }}>Si</Button>
                    <Button variant="outlined" color="error" onClick={(e) => { e.preventDefault(); setIsOpenModal(false) }}>No</Button>
                </Box></Box>
        )
    }
    const updateItemModal = (item: any) => {
        setContentModal(<Form item={item} updateItem={updateItem} setIsOpenModal={setIsOpenModal}></Form>)
        setIsOpenModal(true)
    }
    const deleteItemModal = (item: any) => {
        setContentModal(<DeleteItemModal item={item}></DeleteItemModal>)
        setIsOpenModal(true)
    }

    const createItemModal = () => {
        setContentModal(<Form createItem={createItem} setIsOpenModal={setIsOpenModal}></Form>)
        setIsOpenModal(true)
    }

    const TableActions: FC<{ item: any }> = ({ item }) => {
        return (
            <Box className="flex gap-x-2 justify-center">
                {viewDetails && <span onClick={() => { viewDetails(item) }}><VisibilityOutlined className="hover:cursor-pointer text-primary "></VisibilityOutlined></span>}
                <span onClick={() => { updateItemModal(item) }}><EditOutlined className="hover:cursor-pointer text-secondary "></EditOutlined></span>
                <span onClick={() => { deleteItemModal(item) }}><DeleteOutlineOutlined className="hover:cursor-pointer text-red-400"></DeleteOutlineOutlined></span>
            </Box >
        )
    }
    const dataWithActions = useMemo(() => data.map((item: any) => {
        return { ...item, actions: <TableActions item={item}></TableActions> }
    }), [data, TableActions]);

    const columnsWithActions = useMemo(() => [...columns, {
        name: "actions", label: "ACCIONES", options: {
            filter: false, sort: false
        }
    }], [columns])

    return (
        <Box className="w-3/4">
            <Modal open={isOpenModal} onClose={() => {
                setIsOpenModal(false)
            }} className="flex justify-center items-center" >
                <Box className="w-4/5 md:w-2/5 lg:1/5 max-w-lg bg-zinc-50 rounded">
                    <Box className="w-full flex justify-end pt-2 pr-2"><span onClick={() => { setIsOpenModal(false) }}><CloseOutlined className="hover:cursor-pointer"></CloseOutlined></span></Box>
                    <Box className="p-7">
                        {contentModal}
                    </Box>
                </Box>
            </Modal>
            <Box className="mt-5 flex flex-col gap-y-4 w-full">
                {viewButton && <Box className="flex justify-center"><Button variant="outlined" color="warning" onClick={createItemModal}>Crear nuevo +</Button></Box>}
                {/* <Typography textAlign={"center"}>PERSONS</Typography> */}
                <MUIDataTable title={""} data={actions ? dataWithActions : data} columns={actions ? columnsWithActions : columns} options={{
                    elevation: 2,
                    responsive: "standard",
                    pagination: true, rowsPerPage: 10, tableBodyHeight: "", rowsPerPageOptions: [10],
                    searchAlwaysOpen: true,
                    selectableRows: "none",
                    rowHover: true,
                    selectableRowsHeader: true,
                    textLabels: {
                        body: {
                            noMatch: "No se encontraron resultados",
                            toolTip: "Ordenar",
                            columnHeaderTooltip: (column: any) => `Ordenar por ${column.label}`
                        }, pagination: {
                            next: "Siguiente página",
                            previous: "Página anterior",
                            rowsPerPage: "Filas por página:",
                            displayRows: "de",
                        },
                        toolbar: {
                            search: "Search",
                            downloadCsv: "Descargar CSV ",
                            print: "Imprimir",
                            viewColumns: "Mostra columnas",
                            filterTable: "Filtrar tabla",
                        },
                        filter: {
                            all: "Todos",
                            title: "Filtros",
                            reset: "restaurar filtros",
                        },
                        viewColumns: {
                            title: "Mostar columnas",
                            titleAria: "Mostar/Ocultar columnas",
                        },
                        selectedRows: {
                            text: "columna(s) seleccionada(s)",
                            delete: "Eliminar",
                            deleteAria: "Eliminar seleccion",
                        },
                    },
                }} />
            </Box>
        </Box>
    );
}


