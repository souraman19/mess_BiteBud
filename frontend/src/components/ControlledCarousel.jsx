import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import "./../styles/styles.css";

function ExampleCarouselImage(props) {
  return (
    <img
      className="d-block w-100"
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
    <div className="outermost-gallary">
      <h1 className="gallary-heading">Explore scenes from our mess</h1>
      <div className="mycarousel">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          className="carousel-messmenu"
        >
          <Carousel.Item>
            <ExampleCarouselImage
              text="First slide"
              mysrc="./images/food1.jpg"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage
              text="Second slide"
              mysrc="./images/food2.jpg"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage
              text="Third slide"
              mysrc="./images/food3.jpg"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <Link to="/patelgallery">
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
