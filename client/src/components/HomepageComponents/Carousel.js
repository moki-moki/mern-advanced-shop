import { createRef, useState } from "react";
import { images } from "../data/images";

const Carousel = () => {
  const [currentImg, setCurrentImg] = useState(0);

  const imgRef = images.reduce((acc, val, i) => {
    acc[i] = createRef();
    return acc;
  }, {});

  const slideToImg = (i) => {
    setCurrentImg(i);

    imgRef[i].current.scrollIntoView({
      //     Defines the transition animation.
      behavior: "smooth",
      //      Defines vertical alignment.
      block: "nearest",
      //      Defines horizontal alignment.
      inline: "start",
    });
  };

  const totalImgs = images.length;

  const nextImg = () => {
    if (currentImg >= totalImgs - 1) {
      slideToImg(0);
    } else {
      slideToImg(currentImg + 1);
    }
  };

  const prevImg = () => {
    if (currentImg === 0) {
      slideToImg(totalImgs - 1);
    } else {
      slideToImg(currentImg - 1);
    }
  };

  const arrowStyle =
    "absolute bg-p-primary  text-2xl  h-10 w-10 rounded-full opacity-75 flex items-center justify-center";

  const sliderControl = (isLeft) => (
    <button
      type="button"
      onClick={isLeft ? prevImg : nextImg}
      className={`${arrowStyle} ${isLeft ? "left-2" : "right-2"}`}
      style={{ top: "40%" }}
    >
      <span
        role="img"
        className="text-link-color hover:text-link-hover transition-colors duration-300 h-full w-full  flex justify-center items-center"
        aria-label={`Arrow ${isLeft ? "left" : "right"}`}
      >
        {isLeft ? "<" : ">"}
      </span>
    </button>
  );

  return (
    <div className="p-10 lg:p-10 md:p-5 sm:py-5 sm:w-full  flex justify-center  items-center">
      <div className="relative w-full flex border-2 border-p-primary justify-center items-center">
        <div className="inline-flex w-full h-96 md:h-auto overflow-hidden scroll-mandatory">
          {sliderControl(true)}
          {images.map((img, i) => (
            <div className="w-full flex-shrink-0" key={img.id} ref={imgRef[i]}>
              <img
                src={img.img}
                className="w-full  object-contain md:h-full md:object-cover sm:h-full sm:object-cover"
              />
            </div>
          ))}
          {sliderControl()}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
