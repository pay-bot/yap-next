import { useQuery } from "@tanstack/react-query";
import Benefits from "../../components/website/new-home/Benefits";
import Features from "../../components/website/new-home/Features";
import Hero from "../../components/website/new-home/Hero";
import PriceTable from "../../components/website/new-home/PriceTable";
import { fetchSections } from "../../hooks/useSectionsData";
import WebLayout from "../../components/website/layout/WebLayout";
// import { useMenuData } from '../../hooks/useMenusData';

export default function NewHome() {
  const pageId = 1;
  const { data: section, isSuccess } = useQuery(
    ["sections", { pageId }],
    fetchSections
  );

  return (
    <>
      {/* {isFetching && (

      <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold capitalize bg-white h-screen w-screen z-50">
        <p className="">Please be patient, heroku need more time to load data</p>

        <svg className="animate-spin h-5 w-5 mr-3 " viewBox="0 0 24 24" fill="#000000">
        </svg>

      </div>)} */}
      <WebLayout isSuccess={isSuccess}>
        <Hero dataApi={section?.data?.model} />

        <Features dataApi={section?.data?.model} />

        <Benefits dataApi={section?.data?.model} />

        {/* <OurExperts /> */}

        {/* <Blogs
          dataApi={section?.data?.model}
        /> */}

        <PriceTable dataApi={section?.data?.model} />

        {/* <Testimonials /> */}

        {/* <BottomCTA /> */}
      </WebLayout>
    </>
  );
}

