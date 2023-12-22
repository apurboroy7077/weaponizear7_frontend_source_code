import React, { Component } from "react";
import Slider from "react-slick";
import hitlerQuote from "./../public/images/quotes/hitler.jpg";
import stalinQuote from "./../public/images/quotes/stalin.jpg";
import kimQuote from "./../public/images/quotes/kim_jong_un.jpg";
import putinQuote from "./../public/images/quotes/putin.jpg";
import gaddafiQuote from "./../public/images/quotes/gaddafi.jpg";
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
              <img src={hitlerQuote} />
            </div>
            <div>
              <img src={stalinQuote} />
            </div>
            <div>
              <img src={kimQuote} />
            </div>
            <div>
              <img src={putinQuote} />
            </div>
            <div>
              <img src={gaddafiQuote} />
            </div>
          </Slider>
        </div>
      </>
    );
  }
}
