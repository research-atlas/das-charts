import results from './data.json';

const colors = {
	institute: '#6d9eeb',
	firstYear: '#f1c232',
	secondYear: '#93c47d',
	alumnus: '#e06666'
};

const titles = {
	institute: 'Institute',
	firstYear: 'First Year Student',
	secondYear: 'Second Year Student',
	alumnus: 'Alumnus'
};

export function getData(index: number) {
	const result = results[index];

	const data = {
		title: result.title,
		labels: result.statements.map(statement => statement.split('\n')),
		datasets: Object.entries(result.scores).flatMap(([category, groups]) => {
			return Object.entries(groups).map(([group, values]) => {
				const label = `${category} - ${titles[group]}`;
				console.log(label, values)

				if (!values.length) return null;
				return {
					label,
					backgroundColor: colors[group] as string,
					borderColor: colors[group] as string,
					hoverBackgroundColor: colors[group] as string,
					hoverBorderColor: colors[group] as string,
					data: values,
				}
			}).filter(Boolean) as Chart.ChartDataSets[];
		})
	}

	return data;
}

export type Data = ReturnType<typeof getData>;

