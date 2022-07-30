import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from '../../features/website/shop/cartSlices';
import WebLayout from '../../components/website/layout/WebLayout';

import '@splidejs/splide/dist/css/themes/splide-default.min.css';

function Cart() {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    if (cart.cartItems.length === 0) {
      return navigate('/');
    }
    return null;
  }, []);

  return (
    <WebLayout className="w-full mx-auto flex justify-between shadow-md md:shadow-none h-20 absolute inset-x-0 z-50 bg-black px-10" isShop>
      <div className="3xl:w-7/12 2xl:w-8/12 xl:w-9/12 lg:w-10/12 w-11/12 mx-auto relative py-16">
        <div className="flex xl:flex-row-reverse flex-col  w-full">
          <div className="w-full ">
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div key={cartItem.id} className="flex md:flex-row flex-col my-16 relative">
                  <div className=" 3xl:w-5/12 xl:w-4/12 lg:w-7/12 md:w-6/12 w-full">
                    <Splide
                      options={{
                        type: 'slide',
                        rewind: 'false',
                        perPage: 1,
                        perMove: 1,
                        pagination: false,
                      }}
                    >
                      {cartItem.photos.map((data) => (
                        <SplideSlide key={data.id}>
                          <img src={data.url} alt={cartItem.name} className=" object-cover 3xl:h-[40vh] xl:h-[35vh] h-[30vh] mx-auto  " />
                        </SplideSlide>
                      ))}
                    </Splide>
                  </div>
                  <div className="md:w-6/12  flex h-full pl-8 md:pt-0 pt-4  ">
                    <div className="text-left">
                      <div className="">
                        <div className=" text-xs font-semibold">NEW</div>
                        <h3 className="capitalize">{`Buy ${cartItem.name}`}</h3>
                        <p>{cartItem.desc}</p>
                        <div className="">
                          <p className="font-semibold">Features</p>
                          <div className="">
                            {cartItem.features?.map((data) => (
                              <div key={data.id} className="">
                                {data.name}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="md:absolute bottom-0">
                          <div className="cart-product-price">
                            <span className="font-semibold">Price :</span> ${cartItem.amount}
                          </div>
                          <div className="flex">
                            <span className="font-semibold">Quantity : </span>
                            <div className="ml-4 flex">
                              <button type="button" className="" onClick={() => handleDecreaseCart(cartItem)}>
                                -
                              </button>
                              <div className="mx-2">{cartItem.cartQuantity}</div>
                              <button type="button" onClick={() => handleAddToCart(cartItem)}>
                                +
                              </button>
                            </div>
                          </div>
                          <div className="cart-product-total-price">
                            <span className="font-semibold">Total Price :</span>${cartItem.amount * cartItem.cartQuantity}
                          </div>
                          <button type="button" onClick={() => handleRemoveFromCart(cartItem)}>
                            Remove Item
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="xl:fixed ml-auto xl:ml-0  bg-white shadow-xl rounded-lg top-32   z-50 p-4 2xl:w-96 xl:w-80 lg:w-72 md:w-72 w-full">
            <div className="">
              <button type="button" className="clear-btn" onClick={() => handleClearCart()}>
                Clear Cart
              </button>
              <div className="">
                <div className="flex py-2 text-lg font-bold">
                  <span>Items</span>
                  <span className="ml-auto">Price</span>
                </div>
                {cart.cartItems &&
                  cart.cartItems.map((cartItem) => (
                    <div key={cartItem.id} className="text-left flex">
                      <div className="">
                        {cartItem.name} x {cartItem.cartQuantity}
                      </div>
                      <div className="ml-auto">${cartItem.amount * cartItem.cartQuantity}</div>
                    </div>
                  ))}
                <div className="flex py-2 text-lg font-bold">
                  <span>Subtotal :</span>
                  <span className="ml-auto">${cart.cartTotalAmount}</span>
                </div>
                <div className="flex flex-col ">
                  <Link to="/shop" className="py-4">
                    <span className="bg-blue-500 text-white py-1 px-3 rounded-lg">Checkout</span>
                  </Link>
                  <Link to="/shop">
                    <span className="bg-gray-50 py-1 px-3 rounded-lg">Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebLayout>
  );
}

export default Cart;
