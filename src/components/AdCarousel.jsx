import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getAds } from "../api/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// AdCarousel component: displays a carousel of ads fetched from the backend
export default function AdCarousel() {
  // State to store ads
  const [ads, setAds] = useState([]);

  // Fetch ads from the backend when the component mounts
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

  // Settings for the react-slick carousel
  const settings = {
    dots: true,              // Show navigation dots
    infinite: true,          // Infinite loop sliding
    speed: 1000,             // Transition speed in milliseconds
    slidesToShow: 3,         // Number of slides to show at once
    slidesToScroll: 1,       // Number of slides to scroll at once
    autoplay: true,          // Enable autoplay
    autoplaySpeed: 4000,     // Autoplay speed in milliseconds
    arrows: false,           // Hide navigation arrows
    pauseOnHover: true,      // Pause autoplay on hover
    adaptiveHeight: false,   // Disable adaptive height
    innerWidth: "auto",      // Automatic width adjustment
    centerMode: true,        // Enable center mode
    centerPadding: "0rem",   // Padding for center mode
    initialSlide: 0,         // Initial slide index
    responsive: [            // Responsive settings
      {
        breakpoint: 640,     // Mobile breakpoint
        settings: {
          slidesToShow: 1,   // Show one slide on small screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,    // Tablet breakpoint
        settings: {
          slidesToShow: 3,   // Show three slides on larger screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-20">
      <Slider {...settings}>
        {ads.map((ad, index) => (
          <div key={index}>
            <div className="flex justify-center">
              <img src={ad.image_url} alt={`Ad ${index}`} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
