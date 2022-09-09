import Link from "next/link";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Table = ({ labels, data }) => {
	return (
		<div class="overflow-x-auto relative">
			<table class="w-full text-sm text-left text-gray-300">
				<thead class="text-xs text-gray-300 uppercase bg-neutral-900">
                    {labels.map((label) => (                            
                        <th scope="col" class="py-3 px-6" key={label.id}>
                            {label.name}
                        </th>
					))}
				</thead>
				<tbody>
					{data.map((serie) => (
						<tr key={serie.date} className="border-b border-neutral-600">
							<td className="px-4 py-2">
								<strong>{serie.Title}</strong>
							</td>
							<td className="px-4 py-2">
								<Link href={`/series/${serie.User}`}>
									<a className="text-nflix hover:underline">
										@{serie.User}
									</a>
								</Link>
							</td>
							<td className="px-4 py-2">
								{formatDistanceToNow(new Date(serie.date))} ago
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
