import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useShopProductsData } from '../../hooks/useShopProductsData';
import '@splidejs/splide/dist/css/splide.min.css';
import ListIphone from '../../components/website/shop/ListIphone';
import ListSamsung from '../../components/website/shop/ListSamsung';
import WebLayout from '../../components/website/layout/WebLayout';

export default function Shop() {
  const { isLoading, data } = useShopProductsData();

  return (
    <WebLayout className="w-full mx-auto flex justify-between shadow-md md:shadow-none h-20 absolute inset-x-0 z-50 bg-black px-10" isShop>
      <div className="bg-[#F5F5F7] md:px-16 px-4 py-16">
        {/* {status === "success" ? ( */}
        {isLoading && <div>loading</div>}
        <h2 className="3xl:text-5xl xl:text-4xl text-3xl font-semibold 3xl:py-32 2xl:py-24 lg:py-16 py-8">Which Phone is right for you?</h2>
        <div className="">
          <div className="text-2xl font-semibold text-left pb-8">IPHONE</div>
          <Splide
            className=""
            // ref={ref}
            options={{
              type: 'slide',
              rewind: 'false',
              perPage: 3,
              perMove: 1,
              gap: '1rem',
              pagination: false,
              breakpoints: {
                623: {
                  perPage: 1,
                  perMove: 1,
                },
                1000: {
                  perPage: 2,
                  perMove: 1,
                },
                1024: {
                  perPage: 3,
                  perMove: 1,
                },
                1400: {
                  perPage: 4,
                  perMove: 1,
                },
                1600: {
                  perPage: 4,
                  perMove: 1,
                },
                1920: {
                  perPage: 5,
                  perMove: 1,
                },
                2560: {
                  perPage: 6,
                  perMove: 1,
                },
              },
            }}
          >
            {data?.data?.map((e) => {
              if (e.category_id === 2) {
                return (
                  <SplideSlide>
                    <ListIphone props={e} />
                  </SplideSlide>
                );
              }
              return null;
            })}
          </Splide>
        </div>
        <div className="pt-16">
          <div className="text-2xl font-semibold text-left pb-8">SAMSUNG</div>

          <Splide
            className=""
            // ref={ref}
            options={{
              type: 'slide',
              rewind: 'false',
              perPage: 3,
              perMove: 1,
              gap: '1rem',
              pagination: false,
              breakpoints: {
                623: {
                  perPage: 1,
                  perMove: 1,
                },
                1000: {
                  perPage: 2,
                  perMove: 1,
                },
                1024: {
                  perPage: 3,
                  perMove: 1,
                },
                1400: {
                  perPage: 4,
                  perMove: 1,
                },
                1600: {
                  perPage: 4,
                  perMove: 1,
                },
                1920: {
                  perPage: 5,
                  perMove: 1,
                },
                2560: {
                  perPage: 6,
                  perMove: 1,
                },
              },
            }}
          >
            {data?.data?.map((e) => {
              if (e.category_id === 3) {
                return (
                  <SplideSlide>
                    <ListSamsung props={e} />
                  </SplideSlide>
                );
              }
              return null;
            })}
          </Splide>
        </div>
      </div>
    </WebLayout>
  );
}
