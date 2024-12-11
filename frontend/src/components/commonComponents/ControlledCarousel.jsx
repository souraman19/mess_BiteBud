import { useState } from "react";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import "./../../styles/ControlledCarousel.css";

function ExampleCarouselImage(props) {
  return (
    <img
      className="mx-auto d-block w-75 vh-50"
      src={props.mysrc} // Replace with the actual image URL
      alt={props.text}
    />
  );
}

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="outermost-gallary-cc">
      <h1 className="gallary-heading-cc">Explore scenes from our mess</h1>
      <div className="mycarousel-cc">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          className="carousel-messmenu-cc"
          style={{ width: "90vw", height: "80vh", margin: "auto" , marginBottom: "110px"}}
        >
          <Carousel.Item>
            <ExampleCarouselImage
              text="First slide"
              mysrc="./images/food1.jpg"
            />
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage
              text="Second slide"
              mysrc="./images/food2.jpg"
            />
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage
              text="Third slide"
              mysrc="./images/food1.jpg"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <Link to="/gallery-page">
        <button
          type="button"
          class="gallary-button btn btn-primary btn-lg btn-block"
        >
          Go to Gallery Section
        </button>
      </Link>
    </div>
  );
}

export default ControlledCarousel;
