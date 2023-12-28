import Carousel from "react-bootstrap/Carousel";
import gun1Image from "./../public/images/home/gun1.jpg";
import gun2Image from "./../public/images/home/gun2.jpg";
import gun3Image from "./../public/images/home/gun3.jpg";
import gun4Image from "./../public/images/home/gun4.jpg";
import defaultImage from "./../public/images/products/default.jpg";
import { useEffect, useState } from "react";
import { serverURL } from "../config/Variables";

let CardCarousel = (props) => {
  // let name = props.data.toLowerCase();
  let { name } = props.data;
  let { isGettingSelledByUser } = props.data;
  let originalName = name;
  name = name.toLowerCase();
  let [image1, setImage1] = useState(null);
  let [image2, setImage2] = useState(null);
  let [image3, setImage3] = useState(null);
  let [image4, setImage4] = useState(null);
  useEffect(() => {
    try {
      let fetchimage = async () => {
        try {
          let myimage1 = await import(
            `./../public/images/products/${name}_1.jpg`
          );
          setImage1(myimage1.default);
          let myimage2 = await import(
            `./../public/images/products/${name}_2.jpg`
          );
          setImage2(myimage2.default);
          let myimage3 = await import(
            `./../public/images/products/${name}_3.jpg`
          );
          setImage3(myimage3.default);
          let myimage4 = await import(
            `./../public/images/products/${name}_4.jpg`
          );
          setImage4(myimage4.default);
        } catch (error) {}
      };
      fetchimage();
    } catch (error) {}
  }, []);
  try {
  } catch (error) {}
  let [imageError, setImageError] = useState(false);
  return (
    <Carousel indicators={false}>
      {isGettingSelledByUser && (
        <Carousel.Item>
          {!imageError && (
            <img
              src={`${serverURL}/images/products/${originalName}.jpg`}
              className="cardImage"
              onError={() => {
                setImageError(true);
              }}
            />
          )}
          {imageError && <img src={defaultImage} className="cardImage" />}
        </Carousel.Item>
      )}
      {!image1 && !image2 && !image3 && !image4 && !isGettingSelledByUser && (
        <Carousel.Item>
          <img src={defaultImage} className="cardImage" />
        </Carousel.Item>
      )}
      {image1 && (
        <Carousel.Item>
          <img src={image1} className="cardImage" />
        </Carousel.Item>
      )}

      {image2 && (
        <Carousel.Item>
          <img src={image2} className="cardImage" />
        </Carousel.Item>
      )}

      {image3 && (
        <Carousel.Item>
          <img src={image3} className="cardImage" />
        </Carousel.Item>
      )}
      {image4 && (
        <Carousel.Item>
          <img src={image4} className="cardImage" />
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default CardCarousel;
