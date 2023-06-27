import React from "react";
//@ts-ignore
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { Product } from "../../types/product";
import Image from "next/image";
import { Screens } from "../../constants/screens";

interface Props {
  products: Product[];
}

const Slider = (props: Props) => {
  const { products } = props;
  return (
    <SwiperContainer>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Container>
              <Image
                src={product.mainImage}
                alt={product.name}
                height={1000}
                width={2000}
                layout="fill"
                objectFit="contain"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
};

const SwiperContainer = styled.div`
  margin-bottom: 100px;
  &.swiper {
    width: 100%;
    height: 100%;
  }

  &.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  &.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Container = styled.div`
  height: 900px;

  @media screen and (max-width: ${Screens.xxl}) {
    height: 600px;
  }
  @media screen and (max-width: ${Screens.xl}) {
    height: 450px;
  }
  @media screen and (max-width: ${Screens.lg}) {
    height: 400px;
  }

  @media screen and (max-width: ${Screens.md}) {
    height: 350px;
  }

  @media screen and (max-width: ${Screens.sm}) {
    height: 300px;
  }

  @media screen and (max-width: ${Screens.xs}) {
    height: 240px;
  }
`;

export default Slider;
