import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavItems(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.props);
  }, []);

  const navChildItems = [];

  // console.log('m', data)
  const [toggleNavChild, setToggleNavchild] = useState(false);
  const handleNavChild = () => {
    setToggleNavchild(true);
  };
  return (
    <div>
      {data.parent_id === 0 && (
        <div onClick={handleNavChild} className="">
          <Link to="">
            <i className="fa fa-female" />
            {data.name}
          </Link>
        </div>
      )}
      {toggleNavChild === true && <div className="">{data.id === data.parent_id && <div className="">{data.name}</div>}</div>}
    </div>
  );
}
