import { useEffect, useRef } from 'react';
import tw, { styled } from 'twin.macro';

import _ from 'lodash';
import Navbar from '../../components/website/header/Navbar';
import { usePagesQuery, useThemesQuery } from '../../features/website/api/apiSlice';
import Hero from '../../components/website/home/Hero';
import MakingYourWorld from '../../components/website/home/MakingYourWorld';
import HowWeWork from '../../components/website/home/HowWeWork';
import StayUpToDate from '../../components/website/home/StayUpToDate';
import Footer from '../../components/website/home/Footer';
// import ModalManger from "../utils/ModalManger";

export default function Home() {
  const { data: theme = [] } = useThemesQuery();
  const { data: pageSections, isFetching = [] } = usePagesQuery();

  let bgPage;

  if (theme) {
    const tema = theme;
    if (tema && tema.length !== 0) {
      tema.themes.forEach((th) => {
        const t = th ?? th[0];
        if (t && t.length !== 0) {
          bgPage = t.bgroundPage;
        }
      });
    }
  }
  const videoEl = useRef(null);

  const attemptPlay = () => {
    if (videoEl && videoEl.current) {
      return videoEl.current.play().catch((error) => {
        console.error('Error attempting to play', error);
      });
    }
    return null;
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  const PageWrapper = styled.div`
    ${tw`w-full `}
    background-color: ${bgPage};
  `;

  console.log('page', pageSections);

  const sectionIdSort = [];
  pageSections?.model?.sections?.map((data) => {
    return sectionIdSort.push(data);
  });

  const sortedCols = _.sortBy(sectionIdSort, 'list_order');
  return (
    <PageWrapper>
      {isFetching && (
        <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold capitalize">
          <p className="">Please wait, heroku need more time to load data</p>

          <svg className="animate-spin h-5 w-5 mr-3 " viewBox="0 0 24 24" fill="#000000" />
        </div>
      )}
      <div className="mx-auto max-w-screen-2xl ">
        {/* <ModalManger/> */}
        <Navbar />
        {sortedCols.map((data) => {
          if (data.id === 2) {
            return <Hero />;
          }
          if (data.id === 3) {
            return <MakingYourWorld />;
          }
          // if (data.id === 4) {
          //   return <PeopleAndBusiness />;
          // }
          if (data.id === 5) {
            return <HowWeWork />;
          }
          // if (data.id === 6) {
          //   return <OurServices />;
          // }
          // if (data.id === 7) {
          //   return <Investor />;
          // }
          // if (data.id === 8) {
          //   return <Insights />;
          // }
          if (data.id === 12) {
            return <StayUpToDate />;
          }
          return null;
        })}
        <Footer />
      </div>
    </PageWrapper>
  );
}

// const contenId = 2;
//   const [texts, setTexts] = useState([]);
//   const getTexts = async () => {
//     const response = await getText();
//     const parsedData = await response;
//     const textsData = parsedData;
//     console.log('text', textsData);
//     setTexts(textsData);
//     return texts;
//   };

// const [locations, setLocations] = useState([]);
// const getLocations = async () => {
//   const response = await getLocation();
//   const parsedData = await response;
//   const locationsData = parsedData.locations;
//   console.log('location', locationsData);
//   setLocations(locationsData);
//   return locations;
// };

// if (pageSections) {
//   let sec = pageSections;
//   if (sec && sec.length !== 0) {
//       sec.components.forEach((section, i) => {
//         switch (i) {
//             case 0:
//               if (section && section.length !== 0) {
//                 console.log("section contetnt", section);

//               }
//               break;
//             default:
//               break;
//           }
//     });
//   }
// }
// let content = []

// if (pageSections) {
//   let sec = pageSections;
//   if (sec && sec.length !== 0) {
//       sec.components.forEach((section, i) => {
//         content.push({
//     heading: section.heading,
//     location_id : section.location_id

//         });
//     });
//   }
// }

//  {locations.map((loc, i) => {
//             if (data.location_id === loc.id) {
//               return(
//                 <p className="">{loc.name}</p>
//               )
//             }
//           })}
