import ReactLoading from 'react-loading';

export default function ReactLoadings() {
  const loader = () => {
    return <ReactLoading type="cubes" color="#1F2937" height="4%" width="4%" />;
  };
  return (
    <div id="loaderSection" className="react-loading">
      {loader()}
    </div>
  );
}
