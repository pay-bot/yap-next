import ReactHtmlParser from 'react-html-parser';
import PriceCard from './PriceCard';

function PriceTable({ dataApi }) {
  // let heading;
  const price = [];
  // console.log("p", pageSections);
  if (dataApi) {
    const sec = dataApi?.sections;
    if (sec && sec.length !== 0) {
      const s = sec ?? sec;
      if (s && s.length !== 0) {
        s?.forEach((section) => {
          switch (section.id) {
            case 6:
              section?.components.forEach((contents, i) => {
                price.push(contents);
                switch (i) {
                  case 0:
                    // heading = contents?.heading;
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
    <section className="max-w-screen-lg 2xl:max-w-screen-xl mx-auto mt-28 text-center">
      <h3 className="text-[32px] font-bold">Price Table</h3>
      <p className="font-medium">We offer competitive price</p>

      <div className="mt-11 grid gap-8 md:gap-5 md:grid-cols-3 lg:gap-8 xl:gap-16 justify-center">
        {/* <div className="">
          <div className="border min-w-[80vw] sm:min-w-[400px] md:min-w-full group even:bg-primary even:text-white flex flex-col items-center rounded-xl shadow-borderShadow">
            <div className="mt-6 font-bold text-2xl">
              {heading}
            </div>
            <div className="prose lg:prose-base prose-sm prose-slate">
              {ReactHtmlParser(content)}
            </div>
            <button className="primary-button mt-9 mb-8 group-even:primary-button-white rounded-lg">Order Now</button>
          </div>
        </div> */}
        {/* <PriceCard
          title="Free"
          description="Brief price description"
          price="0"
          operators="2"
        /> */}
        {price.map((data) => (
          <PriceCard key={data.id} title={data.heading} description={ReactHtmlParser(data?.content)} price="5" operators="5+" />
        ))}
        {/* <PriceCard
          title="Premium"
          description="Brief price description"
          price="10"
          operators="10+"
        /> */}
      </div>
    </section>
  );
}

export default PriceTable;
