import { ArcElement, Chart } from 'chart.js';
// import Chart from "react-apexcharts";
import { useArticleChart, useArticleOverAll, useOverAllData, useShopOverAll } from '../../../hooks/useDashboardsData';
import DoughnutChart from '../../../components/Charts/DoughnutChart';
import LineChart from '../../../components/Charts/LineChart';
import SectionWrapper from '../../../components/layout/SectionWrapper';

Chart.register(ArcElement);

export default function Dashboard() {
  const { isLoading, data: dash, isSuccess: isWeb } = useOverAllData();

  const { data: ArticleChart } = useArticleChart();

  const { data: Shop, isSuccess: isShop } = useShopOverAll();

  const { data: Art, isSuccess: isArt } = useArticleOverAll();

  // console.log('chart', ArticleChart)
  const labelsArt = [];
  const seriesArt = [];
  ArticleChart?.data?.map((data) => {
    return labelsArt.push(data.x) && seriesArt.push(data.y);
  });
  // console.log('das', labelsArt)

  if (isLoading) {
    return <h2>Chart is loading</h2>;
  }

  const web = isWeb ? dash?.data : [];
  const shop = isShop ? Shop?.data : [];
  const article = isArt ? Art?.data : [];
  const stats = [];
  const labels = [];
  Object.entries(web).map(([key, value]) => {
    return labels.push(key) && stats.push(value);
  });

  const statsShop = [];
  const labelsShop = [];

  Object.entries(shop).map(([key, value]) => {
    return labelsShop.push(key) && statsShop.push(value);
  });

  const statsArts = [];
  const labelsArts = [];

  Object.entries(article).map(([key, value]) => {
    return labelsArts.push(key) && statsArts.push(value);
  });

  return (
    <SectionWrapper>
      <div className="flex w-full">
        <div className="w-9/12">
          <div className="space-y-4 ">
            <div className="flex  gap-x-2">
              <div className="w-4/12">
                <DoughnutChart title="Website Overiview" label={labels} series={stats} />
              </div>

              <div className="w-4/12">
                <DoughnutChart title="News Overiview" label={labelsArts} series={statsArts} />
              </div>

              <div className="w-4/12">
                <DoughnutChart title="Shop Overiview" label={labelsShop} series={statsShop} />
              </div>
            </div>

            <div className="w-full rounded-lg bg-white shadow-xs">
              <LineChart labels={labelsArt} series={seriesArt} />
            </div>
          </div>
        </div>
        {/* <div className="w-3/12 bg-yellow-300 h-[40vh]">
          test
        </div> */}
      </div>
    </SectionWrapper>
  );
}
