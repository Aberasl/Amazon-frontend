import React from "react";
import { Carousel } from "react-responsive-carousel";
import {img} from './img/Data';
import clasess  from  "./Carousel.module.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function CarouselEffect() {
  return (
    <div>
      <div>
        <Carousel
          autoPlay={false}
          infiniteLoop={false}
          showThumbs={false}
          show
          indicators={false}
          showStatus={false}
        >
          {img.map((ImageItemLink) => {
            return <img src={ImageItemLink} />;
          })}
        </Carousel>
        <div className={clasess.hero_img}></div>
      </div>
    </div>
  );
}

export default CarouselEffect;
