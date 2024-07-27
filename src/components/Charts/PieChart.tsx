import { Pie } from "react-chartjs-2";
import {
	Chart as ChartJS,
	Tooltip,
	Filler,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	ArcElement,
	Legend,
} from "chart.js";

ChartJS.register(
	Tooltip,
	Filler,
	CategoryScale,
	Legend,
	LinearScale,
	PointElement,
	LineElement,
	ArcElement
);

const PieChartOptions = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: false,
		},
	},
};

export const PieChart = ({
	value = [],
	labels = [],
}: {
	value: number[];
	labels: string[];
}) => {
	const data = {
		labels,
		datasets: [
			{
				data: value,
				backgroundColor: ["red", "#01796F"],
				hoverBackgroundColor: ["red", "#01796F"],
				borderColor: ["red", "#01796F"],
			},
		],
	};

	return <Pie data={data} options={PieChartOptions} style={{ zIndex: 10 }} />;
};
