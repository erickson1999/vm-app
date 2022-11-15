import { ContextAuthStateI } from './ContextAuthProvider';

type ContextAuthTypes = { type: 'SET_AUTH' } | { type: 'REMOVE_AUTH' };

export const ContextAuthReducer = (
	state: ContextAuthStateI,
	action: ContextAuthTypes
) => {
	switch (action.type) {
		case 'SET_AUTH': {
			return { ...state, isAuth: true };
		}
		case 'REMOVE_AUTH': {
			return { ...state, isAuth: false };
		}
		default: {
			return state;
		}
	}
};
