import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import GadgetListCard from "./GadgetListCard";
// import { addToCart } from "../features/cartSlice";
import { addToCart } from "../../../features/website/shop/cartSlices";

export default function ListIphone(props) {
  const { propsData } = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(propsData.props);
  }, []);

  const dataIphone = [];

  if (data.category_id === 2) {
    dataIphone.push(data);
  }

  let imgUrl;
  data.photos?.map((pho, i) => {
    if (i === 0) {
      imgUrl = pho.url;
    }
    return null;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const handleLogin = () => {
    toast.warning("You Must Login", { position: "top-center" });
    navigate("/login");
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const isLogin = useSelector((state) => state.authReducer);

  return (
    <>
      {dataIphone.map((iph) => (
        <GadgetListCard
          key={data.id}
          name={iph.name}
          image={imgUrl}
          amount={iph.amount}
          onClickBuy={() =>
            isLogin.adminToken ? handleAddToCart(iph) : handleLogin()
          }
          onClickModal={handleShow}
          modalItemId={iph.id}
          modalItemName={iph.name}
          showModal={show}
          closeModal={handleClose}
        />
      ))}
    </>
  );
}

