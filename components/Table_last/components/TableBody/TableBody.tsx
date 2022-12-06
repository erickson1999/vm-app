import { FC } from 'react';

import { v4 as uuid } from 'uuid';

import { TableBodyI } from '.';
export const TableBody: FC<TableBodyI> = ({ data, configs, options }) => {
	return (
		<tbody>
			{data.map((obj, index) => {
				return (
					<tr className="hover:bg-secondary hover:bg-opacity-50" key={uuid()}>
						{configs.numeration && (
							<td className="p-2 border whitespace-nowrap">{index + 1}</td>
						)}
						{Object.values(obj).map((val) => {
							return (
								<td className="border p-1 whitespace-nowrap" key={uuid()}>
									{val}
								</td>
							);
						})}
						{options.enabled && (
							<td className="border p-2">
								<div className="flex justify-center items-center text-xl gap-x-2">
									{options.actions(obj)}
								</div>
							</td>
						)}
					</tr>
				);
			})}
		</tbody>
	);
};
