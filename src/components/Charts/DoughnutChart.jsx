import { Doughnut } from 'react-chartjs-2';
// import ChartLegend from './ChartLegend'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import ChartCard from './ChartCard';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ label, series, title }) {
  // const { data, isLoading } = useGetCategoryCountQuery();
  // console.log(data);

  const doughnutdata = {
    labels: label,
    datasets: [
      {
        label: '# of Votes',
        data: series,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <ChartCard title={title}>
      <Doughnut data={doughnutdata} />
      {/* <ChartLegend legends={doughnutLegends} /> */}
    </ChartCard>
  );
}

export default DoughnutChart;
