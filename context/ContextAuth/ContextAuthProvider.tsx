import { ReactNode, FC, useReducer } from 'react'
import { ContextAuth } from "./";
import { ContextAuthReducer } from './ContextAuthReducer';





interface ContextAuthProviderI {
    children: ReactNode
}

export interface ContextAuthStateI {
    isAuth: boolean
}
const CONTEXTAUTH_INIT_STATE: ContextAuthStateI = {
    isAuth: false
}
export const ContextAuthProvider: FC<ContextAuthProviderI> = ({ children }) => {
    const [state, dispatch] = useReducer(ContextAuthReducer, CONTEXTAUTH_INIT_STATE)

    const setAuth = (token: string, userData: Object) => {
        try {
            if (state.isAuth === true) {
                globalThis.alert("Ya existe una sesión activa")
            }
            const dataAuth = { token, ...userData }
            globalThis.localStorage.setItem("dataAuth", JSON.stringify(dataAuth))
            dispatch({ type: "SET_AUTH" })
        } catch (error) {
            globalThis.alert("Ocurrio un error al inciar sesión, inténtelo nuevamente")
        }
    }
    //token
    //datauser

    const removeAuth = () => {
        try {
            globalThis.localStorage.removeItem("dataAuth")
            dispatch({ type: "REMOVE_AUTH" })
        } catch (error) {
            globalThis.alert("Ocurrio un error al cerrar sesión, inténtelo nuevamente")
        }
    }
    const getDataAuth = () => { }

    return (
        <ContextAuth.Provider value={{
            ...state,
            //methods
            setAuth, removeAuth, getDataAuth
        }}>
            {children}
        </ContextAuth.Provider>
    )
}
