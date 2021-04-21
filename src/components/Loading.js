import React from 'react';

// Assets
import logo from '../assets/logo.png';

// Swiper
import SwiperCore, { EffectFade, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/effect-fade/effect-fade.scss';
import 'swiper/components/pagination/pagination.scss';

// Material UI
import { LinearProgress } from '@material-ui/core';

// Context
import { Context } from './Context';

SwiperCore.use([Autoplay, EffectFade]);

const Loading = () => {
  /**
   * Context
   */
  const {
    state: { sceneProgress },
  } = React.useContext(Context);

  const [showLoadingScreen, setShowLoadingScreen] = React.useState(true);

  const swiperRef = React.useRef(null);

  const images = [
    'https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/src/assets/concept_art/1.jpg',
    'https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/src/assets/concept_art/2.jpg',
    'https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/src/assets/concept_art/3.jpg',
  ];

  return (
    <div
      className="loading"
      style={{
        opacity: showLoadingScreen ? '1' : '0',
        pointerEvents: showLoadingScreen ? 'all' : 'none',
      }}
    >
      <div className="concept-art">
        <Swiper ref={swiperRef} slidesPerView={1} autoplay={{ delay: 3000 }} effect="fade">
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="image" style={{ backgroundImage: `url("${img}")` }} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <img className="logo" src={logo} alt="The last play logo" />
      <h1 className="title">The Last Play</h1>

      <div className="loading-inner">
        <div
          style={{
            display: sceneProgress !== 100 ? 'block' : 'none',
            marginBottom: 30,
          }}
        >
          <span>Loading...</span>
          <LinearProgress variant="buffer" valueBuffer={sceneProgress} value={sceneProgress} />
        </div>
        <button
          className="begin-btn"
          style={{
            // opacity: sceneProgress !== 100 ? '0' : '1',
            // pointerEvents: sceneProgress !== 100 ? 'none' : 'all',
            display: sceneProgress !== 100 ? 'none' : 'block',
          }}
          onClick={() => setShowLoadingScreen(!showLoadingScreen)}
        >
          Start the experience
        </button>
      </div>
    </div>
  );
};

export default Loading;
