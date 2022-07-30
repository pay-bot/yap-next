import { useEffect, useRef } from 'react';

import ReactHtmlParser from 'react-html-parser';
import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';
import { usePagesQuery, useThemesQuery } from '../../../features/website/api/apiSlice';

export default function Hero() {
  const { data: theme = [] } = useThemesQuery();
  const { data: pageSections = [] } = usePagesQuery();
  // const { data: text = [] } = useTextsQuery();
  // console.log(text)

  let bgPage;
  let bgSect;
  let txtColorSection;

  if (theme) {
    const tema = theme?.themes;
    if (tema && tema.length !== 0) {
      tema.forEach((theme, i) => {
        const t = theme ?? theme;
        if (t && t.length !== 0) {
          bgPage = t.bgroundPage;
          bgSect = t.bgroundSection;
          txtColorSection = t.txtcolorscdSection;
        }
      });
    }
  }
  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error('Error attempting to play', error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);
  let contentId;
  let action;
  let title;
  let content;
  let video;
  let textLearn;
  console.log('p', pageSections);
  if (pageSections) {
    const sec = pageSections?.contentWithTexts;
    if (sec && sec.length !== 0) {
      const s = sec ?? sec;
      if (s && s.length !== 0) {
        s?.forEach((section, i) => {
          switch (section.id) {
            case 2:
              contentId = section?.id;
              action = section?.action_name;
              title = section?.heading;
              content = section?.content;
              video = section?.action_url;
              textLearn = Object.entries(section?.texts).map((data) => data[1].title);
              break;
            default:
              break;
          }
        });
      }
    }
  }
  // let learn;
  // {
  //   Object.entries(text).map((data) => {
  //     data[1].map((data) => {
  //       // data[0]?.map((data) => {
  //       if (data.content_id === 2) {
  //         learn = data.description;
  //         // })
  //       }
  //     });
  //   });
  // }

  const Hero = styled.div`
    ${tw`absolute z-30 h-full`}
    background: linear-gradient(
    90deg,
    ${bgSect} 0%,
    ${bgSect} 0%,
    rgba(116, 242, 250, 0) 50%
  );
  `;

  const CaptionArticle = styled.p`
    ${tw`pt-10 font-bold text-center uppercase lg:text-left`}
    color : ${txtColorSection};
  `;
  console.log('v', video);
  return (
    <div className="hd:pl-12 relative z-0 w-full bg-white md:h-full 2xl:pl-16 ">
      <Hero>
        <div className="mx-auto flex h-full w-11/12 items-center lg:mx-0 lg:w-7/12 2xl:w-6/12">
          <div className="hd:pl-16 lg:pl-8 xl:pl-20 2xl:pl-32">
            <CaptionArticle>{action}</CaptionArticle>
            <div className="py-8 text-center text-3xl text-white lg:text-left lg:text-5xl lg:text-6xl">{title}</div>
            <div className="textfont-semibold text-center text-xl text-white lg:text-left ">{ReactHtmlParser(content)}</div>
            <div className="flex justify-center py-20 lg:justify-start ">
              <Link to="/">
                <div className="inline border px-3 py-2 text-white">{textLearn}</div>
              </Link>
            </div>
          </div>
        </div>
      </Hero>

      <video
        className="h-[80vh] object-fill md:h-[50vh] lg:h-[55vh] xl:h-[100vh] 2xl:h-[70vh] "
        style={{
          maxWidth: '100%',
          width: '120%',
          height: '',
          margin: '',
        }}
        playsInline
        loop
        muted
        controls
        alt="All the devices"
        src={video}
        ref={videoEl}
      />
    </div>
  );
}
