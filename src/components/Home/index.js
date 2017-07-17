import React, { Component } from "react";
import { Fullpage, HorizontalSlider, Slide } from "fullpage-react";
import ImageGallery from "react-image-gallery";
import "skeleton-css/css/normalize.css";
import "skeleton-css/css/skeleton.css";
import "./index.css";

const { changeHorizontalSlide, changeFullpageSlide } = Fullpage;

const images = [
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhjao9ey1xj20qo0zk0x2.jpg"
  },
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhjao95ll7j20zk0zk0zn.jpg"
  },
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhjao8sjp9j20k00qotb8.jpg"
  },
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhjao87yggj20zk0qon06.jpg"
  }
];
const chi = [
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhmpgwzpp6j21w02iohdt.jpg"
  },
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhmphwz3tgj21w02iokjl.jpg"
  },
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhmphttuerj22io1w0npd.jpg"
  },
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhmphowruij22im1vyb29.jpg"
  },
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhmphu8mp5j22io1w0kjl.jpg"
  },
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhmpgvpsajj22io1w0x4f.jpg"
  },
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhmph1bftzj22io1w07wh.jpg"
  },
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhmphnrsihj21w02iokjl.jpg"
  },
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhmpgb3jw7j21w02d07m9.jpg"
  },
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhmpgz5trtj21w02iob29.jpg"
  },
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhmph0opvzj21w02iohdt.jpg"
  },
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhmpg6e55oj20zk0qoq7e.jpg"
  },
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhmpg6h2ojj20zk0qotcj.jpg"
  },
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhmpgu33izj22io1w0b29.jpg"
  },
  {
    original: "http://ww1.sinaimg.cn/large/71d9c3dcgy1fhmphugwl3j22io1w0kjl.jpg"
  }
];

const fullPageOptions = {
  scrollSensitivity: 7,
  touchSensitivity: 7,
  scrollSpeed: 500,
  resetSlides: true,
  hideScrollBars: true,
  enableArrowKeys: true
};

const horizontalNavStyle = {
  position: "absolute",
  width: "100%",
  top: "50%",
  zIndex: 10
};

const horizontalSliderProps = {
  name: "horizontalSlider1",
  infinite: true
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {
        Fullpage: 0,
        horizontalSlider1: 0
      }
    };

    this.onSlideChangeStart = this.onSlideChangeStart.bind(this);
    this.onSlideChangeEnd = this.onSlideChangeEnd.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
  }

  onSlideChangeStart(name, props, state, newState) {
    if (!this.horizontalNav) {
      this.horizontalNav = document.getElementById("horizontal-nav");
    }

    if (name === "horizontalSlider1") {
      scrollNavStart(this.horizontalNav);
    }
  }

  onSlideChangeEnd(name, props, state, newState) {
    if (name === "horizontalSlider1") {
      scrollNavEnd(this.horizontalNav);
    }

    const oldActive = this.state.active;
    const sliderState = {
      [name]: newState.activeSlide
    };

    const updatedState = Object.assign(oldActive, sliderState);
    this.setState(updatedState);
  }

  prevSlide() {
    alert("prev", this.state.active.Fullpage);
    changeFullpageSlide(this, this.state.active.Fullpage - 1);
  }

  nextSlide() {
    alert("next", this.state.active.Fullpage);
    changeFullpageSlide(this, this.state.active.Fullpage + 1);
  }

  componentDidMount() {
    let startX = 0;
    let startY = 0;

    document.addEventListener("touchstart", function(ev) {
      startX = ev.touches[0].pageX;
      startY = ev.touches[0].pageY;
    });
    document.addEventListener("touchend", ev => {
      const dx = ev.changedTouches[0].pageX - startX;
      const dy = ev.changedTouches[0].pageY - startY;

      //如果滑动距离太短
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return;
      }
      const angle = getSlideAngle(dx, dy);
      const currentPage = this.state.active.Fullpage;
      if (angle >= 45 && angle < 135) {
        changeFullpageSlide(currentPage);
      } else if (angle >= -135 && angle < -45) {
        changeFullpageSlide(currentPage);
      }
    });
  }
  componentWillUnMount() {
    document.removeEventListener("touchstart");
    document.removeEventListener("touchend");
  }

  render() {
    const horizontalSliderName = horizontalSliderProps.name;
    const horizontalActive = this.state.active[horizontalSliderName];

    const prevHorizontalSlide = changeHorizontalSlide.bind(
      null,
      horizontalSliderName,
      horizontalActive - 1
    );
    const nextHorizontalSlide = changeHorizontalSlide.bind(
      null,
      horizontalSliderName,
      horizontalActive + 1
    );

    const horizontalNav = (
      <div id="horizontal-nav" className="slide" style={horizontalNavStyle}>
        <button
          className="btn"
          style={{ position: "absolute", left: "0px" }}
          onClick={prevHorizontalSlide}>
          &lt;
        </button>
        <button
          className="btn"
          style={{ position: "absolute", right: "0px" }}
          onClick={nextHorizontalSlide}>
          &gt;
        </button>
      </div>
    );

    const horizontalSlides = [
      <Slide className="warm-b">
        <div className="sub-title">mcdull - A FAT DOG</div>
        <img
          alt="mcdull"
          src="http://ww1.sinaimg.cn/large/71d9c3dcgy1fhjao87yggj20zk0qon06.jpg"
          style={{
            borderTopLeftRadius: "50%",
            borderTopRightRadius: "50%",
            maxHeight: "300px",
            maxWidth: "300px",
            width: "auto",
            height: "auto"
          }}
        />
      </Slide>,
      <Slide className="pink-b">
        <div className="sub-title">
          麦兜祖籍山东泰安<br /> 喜欢吃面食
        </div>
      </Slide>,
      <Slide style={{ backgroundColor: "#2B2C28" }}>
        <div className="sub-title">麦兜有脚臭 -></div>
      </Slide>
    ];
    horizontalSliderProps.slides = horizontalSlides;

    const horizontalSlider = (
      <HorizontalSlider
        id="horizontal-slider-1"
        className="slide "
        {...horizontalSliderProps}>
        {horizontalNav}
      </HorizontalSlider>
    );

    const verticalSlides = [
      <Slide className="slide ice-b">
        <div className="arrow-down arrow-down-2 arrow-title-1" />
        <div className="arrow-down arrow-down-2 arrow-title-2" />
        <div className="arrow-down arrow-down-2 arrow-title-3" />
        <div id="title">chi - A FAT CAT</div>
        <img
          style={{
            borderTopLeftRadius: "50%",
            borderTopRightRadius: "50%",
            maxHeight: "300px",
            maxWidth: "300px",
            width: "auto",
            height: "auto"
          }}
          alt="chi"
          src="http://ww1.sinaimg.cn/large/71d9c3dcgy1fhjirjfv93j22io1w0kjl.jpg"
        />
      </Slide>,
      horizontalSlider,
      <Slide className="ice-b">
        <section style={{ maxWidth: 700, margin: "auto" }}>
          <ImageGallery
            items={chi}
            slideInterval={2000}
            showThumbnails={false}
          />
        </section>
      </Slide>,
      <Slide className="orange-b">
        <section style={{ maxWidth: 700, margin: "auto" }}>
          <ImageGallery
            items={images}
            slideInterval={2000}
            showThumbnails={false}
          />
        </section>
      </Slide>
    ];
    fullPageOptions.slides = verticalSlides;

    return (
      <Fullpage
        onSlideChangeStart={this.onSlideChangeStart}
        onSlideChangeEnd={this.onSlideChangeEnd}
        {...fullPageOptions}
      />
    );
  }
}

//返回角度
function getSlideAngle(dx, dy) {
  return Math.atan2(dy, dx) * 180 / Math.PI;
}
function scrollNavStart(nav) {
  // make the nav fixed when we start scrolling horizontally
  nav.style.position = "fixed";
}

function scrollNavEnd(nav) {
  // make the nav absolute when scroll finishes
  nav.style.position = "absolute";
}

export default Home;
