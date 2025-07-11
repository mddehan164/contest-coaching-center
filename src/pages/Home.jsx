// pages/Home.jsx

import React from 'react';
import { Courses, NoticeMain, ServicesStats, Slider, StatsMain, SuccessCards, Summary } from '../components/index';
import ScrollAnimatedSection from '../components/ScrollAnimatedSection'


const Home = () => {
  return (
    <div className='px-1 sm:px-5 md:px-10 lg:px-20 xl:px-44'>
      <ScrollAnimatedSection id="slider" direction="right">
        <Slider />
      </ScrollAnimatedSection>
      <ScrollAnimatedSection id="notice" direction="left">
        <NoticeMain />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection id="course" direction="right">
        <Courses />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection id="stats" direction="left">
        <StatsMain />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection id="success" direction="right">
        <SuccessCards />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection id="services" direction="left">
        <ServicesStats />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection id="summary" direction="right">
        <Summary />
      </ScrollAnimatedSection>
    </div>
  );
};

export default Home;
