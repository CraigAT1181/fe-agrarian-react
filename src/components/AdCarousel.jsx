import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getAds } from "../api/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AdCarousel() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const populateAds = async () => {
      try {
        const fetchedAds = await getAds();
        setAds(fetchedAds.ads);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    populateAds();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
    adaptiveHeight: false,
    innerWidth: "auto",
    centerMode: true,
    centerPadding: "0rem",
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-20">
      <Slider {...settings}>
        {ads.map((ad, index) => (
          <div
            key={index}>
            <div className="flex justify-center">
              <img
                src={ad.image_url}
                alt={`Ad ${index}`}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
