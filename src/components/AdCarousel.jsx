import React from 'react';
import Slider from 'react-slick';

export default function AdCarousel ({ advertisements }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            {advertisements.map(advertisement => (
                <div key={advertisement.id}>
                    <img src={advertisement.image} alt={advertisement.title} />
                </div>
            ))}
        </Slider>
    );
};