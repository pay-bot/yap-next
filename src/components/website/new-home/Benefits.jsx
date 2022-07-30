import ReactHtmlParser from 'react-html-parser';

function Benefits({ dataApi }) {
  // let heading;
  // let content;
  // let media;
  const benefits = [];
  // console.log("p", pageSections);
  if (dataApi) {
    const sec = dataApi?.sections;
    if (sec && sec.length !== 0) {
      const s = sec ?? sec;
      if (s && s.length !== 0) {
        s?.forEach((section) => {
          switch (section.id) {
            case 5:
              section?.components.forEach((contents, i) => {
                benefits.push(contents);
                switch (i) {
                  case 0:
                    // heading = contents?.heading;
                    // content = contents?.content;
                    // media = `https://yap-admin.herokuapp.com/uploads/images/${contents?.media}`;
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
    <section className="max-w-screen-lg 2xl:max-w-screen-xl mx-auto mt-24 space-y-24">
      {benefits.map((data) => (
        <div key={data.id} className="w-full flex md:flex-row flex-col-reverse items-center md:gap-y-0 gap-y-4 gap-x-20 md:even:flex-row-reverse">
          <div className="md:w-6/12 w-full px-4">{ReactHtmlParser(data.content)}</div>
          <div className="md:w-6/12 w-full px-4">
            <img src={`https://yap-admin.herokuapp.com/uploads/images/${data?.media}`} alt="" className="w-full" />
          </div>
        </div>
      ))}
    </section>
  );
}

export default Benefits;
