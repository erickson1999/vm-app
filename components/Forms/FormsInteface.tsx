export interface FormsI {
	item?: any,
	createItem?: (item: any, isOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => void,
	updateItem?: (item: any, isOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => void,
	setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}