// pages/Home.jsx

import React from 'react';
import { Courses, NoticeMain, ServicesStats, Slider, StatsMain, SuccessCards, Summary,ScrollAnimatedSection } from '../components/index';

const Home = () => {
  return (
    <div className='max-sm:px-1 sm:px-5 md:px-10 lg:px-20 xl:px-44'>
        <Slider />
      <ScrollAnimatedSection id="notice" direction="left">
        <NoticeMain />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection id="courses" direction="right">
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
