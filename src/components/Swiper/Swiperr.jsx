import React, { Children, cloneElement, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import CategoriesContainer from "../CategoriesContainer/CategoriesContainer";
const Swiperr = ({ items, selectTargetCategory }) => {
  const screenWidth = useRef(window.outerWidth).current;

  const maxWidth = screenWidth - 50;
  return (
    <>
      <div style={{ maxWidth: maxWidth }}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={screenWidth / 400}
          navigation
          // pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {items?.map((item) => (
            <SwiperSlide key={item._id}>
              <CategoriesContainer
                category={item}
                selectTargetCategory={selectTargetCategory}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Swiperr;
