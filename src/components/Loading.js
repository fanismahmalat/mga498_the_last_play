import React from 'react';
import Sound from 'react-sound';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

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
   * State
   */
  const [introPlaying, setIntroPlaying] = React.useState(false);
  const [ambientPlaying, setAmbientPlaying] = React.useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = React.useState(true);

  /**
   * Context
   */
  const {
    state: { sceneProgress, ambientSoundVolume },
  } = React.useContext(Context);

  /**
   * Refs
   */
  const swiperRef = React.useRef(null);
  const introTextRef = React.useRef(null);

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
      <Sound
        url="https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/public/scene/sound/icanhearthebells.mp3"
        autoLoad={true}
        playStatus={ambientPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
        loop={true}
        volume={ambientSoundVolume}
      />
      <Sound
        url="https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/public/scene/sound/intro.mp3"
        autoLoad={true}
        playStatus={introPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
        volume={70}
        onFinishedPlaying={() => {
          setShowLoadingScreen(false);
          setIntroPlaying(false);
        }}
      />
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
        <p ref={introTextRef} className="intro-text">
          "The last play® is my magnum opus, my mark on history if you will. The last play though is
          the swan song of my theater. Let us witness what occured before it, that led me to shut
          down my theater."
        </p>
        <div
          className="progress-bar"
          style={{
            display: sceneProgress !== 100 ? 'block' : 'none',
          }}
        >
          <span>Loading...</span>
          <LinearProgress variant="buffer" valueBuffer={sceneProgress} value={sceneProgress} />
        </div>

        {sceneProgress === 100 && (
          <>
            <div
              className="begin-btn"
              onClick={(e) => {
                new TWEEN.Tween(e.target.style)
                  .to({ opacity: 0, height: 0, padding: 0 }, 1000)
                  .easing(TWEEN.Easing.Quadratic.InOut)
                  .onComplete(() => (e.target.style.visibility = 'hidden'))
                  .start();

                setIntroPlaying(true);
                setAmbientPlaying(true);
                introTextRef.current.classList.add('intro-anim-start');
              }}
            >
              Start the experience
            </div>
            <button
              className="skip-btn"
              onClick={() => {
                setShowLoadingScreen(false);
                setIntroPlaying(false);
                setAmbientPlaying(true);
              }}
            >
              Skip intro
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Loading;
