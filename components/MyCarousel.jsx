import Carousel from "react-bootstrap/Carousel";
import gun1Image from "./../public/images/home/gun1.jpg";
import gun2Image from "./../public/images/home/gun2.jpg";
import gun3Image from "./../public/images/home/gun3.jpg";
import gun4Image from "./../public/images/home/gun4.jpg";
import { useSelector } from "react-redux";

let MyCarousel = () => {
  let userData = useSelector((state) => state.userData);

  return (
    <Carousel>
      <Carousel.Item>
        <img
          src={gun1Image}
          style={{
            maxHeight: "15rem",
            objectFit: "cover",
            width: "100%",
            filter: "brightness(35%)",
          }}
        />
        <Carousel.Caption>
          {!userData && <h3>M416</h3>}
          {userData && <h3>Hello {userData.name}!</h3>}
          <p>We all know what it is</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={gun2Image}
          style={{
            maxHeight: "15rem",
            objectFit: "cover",
            width: "100%",
            filter: "brightness(35%)",
          }}
        />
        <Carousel.Caption>
          {!userData && <h3>Sniper</h3>}
          {userData && <h3>Hello {userData.name}!</h3>}
          <p>Blow Your Target From Distance</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          src={gun3Image}
          style={{
            maxHeight: "15rem",
            objectFit: "cover",
            width: "100%",
            filter: "brightness(35%)",
          }}
        />
        <Carousel.Caption>
          {!userData && <h3>Sniper</h3>}
          {userData && <h3>Hello {userData.name}!</h3>}
          <p>Capable of being used in Military Services</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={gun4Image}
          style={{
            maxHeight: "15rem",
            objectFit: "cover",
            width: "100%",
            filter: "brightness(35%)",
          }}
        />
        <Carousel.Caption>
          {!userData && <h3>Massive Power</h3>}
          {userData && <h3>Hello {userData.name}!</h3>}
          <p>Turn Your Target Into Pieces</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default MyCarousel;
