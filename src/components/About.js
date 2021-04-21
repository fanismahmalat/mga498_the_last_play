import React from 'react';
import { motion } from 'framer-motion';

// Assets
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';
import CUTLogo from '../assets/cut_logo.png';

// Context
import { Context } from './Context';

const About = () => {
  /**
   * Context
   */
  const { state, dispatch } = React.useContext(Context);

  const sceneVariants = {
    enter: {
      opacity: 1,
      pointerEvents: 'all',
      visibility: 'visible',
    },
    exit: {
      opacity: 0,
      pointerEvents: 'none',
      transitionEnd: {
        visibility: 'hidden',
      },
    },
  };

  const handleCloseAbout = () => {
    dispatch({
      type: 'field',
      field: 'aboutOpen',
      payload: false,
    });
  };

  return (
    <motion.div
      initial={false}
      exit={false}
      variants={sceneVariants}
      animate={state.aboutOpen ? 'enter' : 'exit'}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="about-page"
    >
      <div className="overlay"></div>
      <button className="close-btn" onClick={handleCloseAbout}>
        <CloseIcon />
      </button>

      <div className="container">
        <h1 className="title">The Last Play</h1>
        <p>
          The Last Play is a VR experience, supplemented by a real life performance space, combining
          an installation, projections, era-themed objects and an artbook. It was developed by a
          group of 3rd and 4th year students, from the Department of Multimedia and Graphic Arts, in
          the context of the module MGA498: Project Based Teamwork Practices. Over the course of 4
          months, the 16 students split into various teams according to the disciplines required for
          video game development.
        </p>
        <p>
          The project explores themes of time travel and the passage of time within the confines of
          a theatre, beginning in mid-twentieth-century New Orleans and concluding in present times.
          The experience implements environmental storytelling and narration to showcase a story
          wherein every participant walks away having drawn their own conclusions about the
          characters and the space itself.
        </p>
        <span className="sub-title">Credits</span>
        <div className="grid">
          <div className="role">
            <p className="role-name">Project Manager</p>
            <p className="person-name">Photini Symeou</p>
          </div>
          <div className="role">
            <p className="role-name">Art Director</p>
            <p className="person-name">Margarita Zikou</p>
          </div>
          <div className="role">
            <p className="role-name">3D Content Manager</p>
            <p className="person-name">Christia Darna</p>
          </div>
          <div className="role">
            <p className="role-name">Unity Generalist</p>
            <p className="person-name">Constantinos Neokleous</p>
          </div>
          <div className="role">
            <p className="role-name">Web Developer</p>
            <p className="person-name">Fanis Mahmalat</p>
          </div>
          <div className="role">
            <p className="role-name">Music & Sound Designer</p>
            <p className="person-name">Stefanos Chrysanthou</p>
          </div>
          <div className="role">
            <p className="role-name">Level Designers</p>
            <p className="person-name">Marilena Papakyriakou</p>
            <p className="person-name">Arsinoe Constantinou</p>
            <p className="person-name">Arsinoe Constantinou</p>
            <p className="person-name">Chrystalia Pascalidou</p>
            <p className="person-name">Stalo Varnava</p>
          </div>
          <div className="role">
            <p className="role-name">Worldbuilders & Writers</p>
            <p className="person-name">Babis Venetis</p>
            <p className="person-name">Chloe Anastasia Antoniadi</p>
            <p className="person-name">Photini Symeou</p>
          </div>
          <div className="role">
            <p className="role-name">Concept Artists</p>
            <p className="person-name">Christina Sahpazidou</p>
            <p className="person-name">Chloe Anastasia Antoniadi</p>
            <p className="person-name">Antonis Panayiotou</p>
          </div>
          <div className="role">
            <p className="role-name">Graphic Designers</p>
            <p className="person-name">Oleksandra Skriptsova</p>
            <p className="person-name">Marilena Petrou</p>
          </div>
        </div>

        <img src={CUTLogo} alt="Cyprus University of Technology" className="cut-logo" />
      </div>
    </motion.div>
  );
};

export default About;
