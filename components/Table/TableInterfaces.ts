import { FC } from 'react';

export interface TableGridI {
	data: Object[];
	columns: TableGridColumnsI[];
	Form: FC<TableGridFormI>;
	viewButton?: false;
	actions?: false;
	deleteItem: (
		item: any,
		setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
	) => void;
	createItem: (
		item: any,
		setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
	) => void;
	updateItem: (
		item: any,
		setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
	) => void;
	viewDetails?: (item: any) => void;
}
export interface TableGridColumnsI {
	name: string;
	label: string;
	options: TableGridColumnsOptionsI;
}
interface TableGridColumnsOptionsI {
	filter: boolean;
	sort: boolean;
}
interface TableGridFormI {
	item?: any;
	createItem?: (
		item: any,
		setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
	) => void;
	updateItem?: (
		item: any,
		setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
	) => void;
	setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
