import { createContext } from 'react';

interface ContextAuthI {
	isAuth: boolean;
	setAuth: (token: string, userData: Object) => void;
	getDataAuth: () => void;
	removeAuth: () => void;
}

export const ContextAuth = createContext({} as ContextAuthI);
