import { useHeadersQuery } from '../features/api/apiSlice';

function About() {
  const { data: headers = [] } = useHeadersQuery();
  // const { data: articles = [] } = useMenusQuery();
  console.log('ini menu', headers);
  return (
    <div>
      <h1>This is about page.</h1>
    </div>
  );
}

export default About;
