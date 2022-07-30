import { CursorClickIcon } from '@heroicons/react/solid';
import ReactHtmlParser from 'react-html-parser';
import Feature from './FeatureItem';

function Features({ dataApi }) {
  // let contentId;
  // let action;
  let heading;
  // let live;
  // let docs;
  const featureCard = [];
  if (dataApi) {
    const sec = dataApi?.sections;
    if (sec && sec.length !== 0) {
      const s = sec ?? sec;
      if (s && s.length !== 0) {
        s?.forEach((section) => {
          switch (section.id) {
            case 4:
              // contentId = section?.id;
              // action = section?.action_name;
              // heading = section?.heading;

              section?.components.forEach((se) => {
                if (se.id > 5) {
                  featureCard.push({
                    heading: se.heading,
                    content: se.content,
                  });
                }
                switch (se.id) {
                  case 5:
                    heading = se?.heading;

                    se?.texts?.forEach((text, i) => {
                      switch (i) {
                        case 0:
                          // live = text.title;
                          break;
                        case 1:
                          // docs = text.title;
                          break;

                        default:
                          break;
                      }
                    });
                    // heroImg = section.photos[0].url
                    break;

                  default:
                    break;
                }
              });

              break;
            default:
              break;
          }
        });
      }
    }
  }

  return (
    <section className="max-w-screen-lg 2xl:max-w-screen-xl mx-auto  flex flex-col items-center mt-24">
      <h2 className="text-[32px] font-bold text-center sm:text-left">{heading}</h2>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-12 p-4 rounded">
        {featureCard?.map((data) => (
          <Feature key={data.id} Icon={CursorClickIcon} title={data.heading} iconBgColor="#0D42A3" description={ReactHtmlParser(data.content)} />
        ))}
      </div>

      {/* <button className="primary-button mt-14">Sign up Now</button> */}
    </section>
  );
}

export default Features;
