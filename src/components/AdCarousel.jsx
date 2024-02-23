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
        console.log(fetchedAds);
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
    autoplaySpeed: 5000,
    arrows: true,
    pauseOnHover: true,
    adaptiveHeight: false,
    innerWidth: "auto",
    centerMode: true,
    centerPadding: "1rem",
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 768,
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
    <div className="container mt-3 mb-1">
      <Slider {...settings}>
        {ads.map((ad, index) => (
          <div key={index}>
            <span style={{position: "absolute", backgroundColor: "white", padding: "4px"}}>Ad Example</span>
            <img src={ad.image_url} alt={`Ad ${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
