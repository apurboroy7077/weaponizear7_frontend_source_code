import React, { Component } from "react";
import Slider from "react-slick";
import image1 from "./../public/images/products/akm_1.jpg";
import hitler from "./../public/images/quotes/hitler.jpg";
export default class CenterMode extends Component {
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "0",
      slidesToShow: 3, // Display 3 slides at once
      slidesToScroll: 1,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
    };

    const sliderStyle = {
      width: "100%", // Adjust the width of the slider container
      margin: "0 auto", // Center the slider horizontally
    };

    return (
      <>
        <p
          style={{
            color: "white",
            padding: "0",
            margin: "0",
            textAlign: "center",
            fontSize: "1.5rem",
            marginTop: "5rem",
          }}
        >
          Our Satisfied Customers
        </p>
        <div>
          <Slider {...settings}>
            <div>
              <img src="/src/Apps2/A6_Gun_Shop/public/images/quotes/hitler.jpg" />
            </div>
            <div>
              <img src="/src/Apps2/A6_Gun_Shop/public/images/quotes/stalin.jpg" />
            </div>
            <div>
              <img src="/src/Apps2/A6_Gun_Shop/public/images/quotes/kim_jong_un.jpg" />
            </div>
            <div>
              <img src="/src/Apps2/A6_Gun_Shop/public/images/quotes/putin.jpg" />
            </div>
            <div>
              <img src="/src/Apps2/A6_Gun_Shop/public/images/quotes/gaddafi.jpg" />
            </div>
          </Slider>
        </div>
      </>
    );
  }
}
