import { FC, useState } from 'react';
import { LayoutGeneralI } from '.';
import { Sidebar, SidebarItemI } from '../../components';
import { LayoutGeneralNavbar } from './components/LayoutGeneralNavbar';

//data example
const itemsFake: SidebarItemI[] = [
	{
		name: 'Asistencias',
		url: '/asistencias',
	},
	{
		name: 'Programas',
		url: '/programas',
	},
	{
		name: 'Proyectos',
		url: '/proyectos',
	},
	{
		name: 'Personas',
		url: '/personas',
	},
	{
		name: 'Sucursales',
		url: '/sucursales',
	},
	{
		name: 'Facultades',
		url: '/facultades',
	},
	{
		name: 'Escuelas',
		url: '/escuelas',
	},
];

export const LayoutGeneral: FC<LayoutGeneralI> = ({
	children,
	navbarHeight = '',
	navbarWidth = '',
}) => {
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);
	return (
		<>
			<Sidebar
				isOpenSidebar={isOpenSidebar}
				setIsOpenSidebar={setIsOpenSidebar}
				items={itemsFake}
			></Sidebar>
			<LayoutGeneralNavbar
				height={navbarHeight}
				width={navbarWidth}
				isOpenSidebar={isOpenSidebar}
				setIsOpenSidebar={setIsOpenSidebar}
			></LayoutGeneralNavbar>
			{children}
		</>
	);
};
