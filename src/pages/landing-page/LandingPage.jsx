import { SectionFirst } from './SectionFirst.jsx';
import { SectionFour } from './SectionFour.jsx';
import { SectionFive } from './SectionFive/SectionFive.jsx';
import { SectionSix } from './SectionSix/SectionSix.jsx';
import { LandingFooter } from './LandingFooter.jsx';
import ScrollCarouselEffect from './hooks.jsx';
import { ScrolledQuotes } from '../../components/scrolls/ScrolledQuotes.jsx';
import { RunningString } from '../../components/runners/RunningString.jsx';
import './styles.css';
import { useEffect } from 'react';

export const LandingPage = () => {
  useEffect(() => {
    fetch('https://emailfy-156e3ca9-2f30-4e91-886b-76e7c7a35521.railway.app/api/test')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error('Error:', err));
  }, []);
  return (
    <div id="landing-page" className={`landing-page`}>
      <SectionFirst/>
      
      <ScrollCarouselEffect bg="var(--grey-0)">
        <ScrolledQuotes title={'Work together seamlessly'} bg="var(--orange-9)">
          Our platform offers a superior experience with powerful multi-admin functionalities <br/>
          for tailored access and built-in comments to keep your team's communication organized and efficient.
        </ScrolledQuotes>
      </ScrollCarouselEffect>
      
      <SectionFour/>
      
      <RunningString>
        Automate campaigns ✦ Segment your audience ✦ Personalize content ✦ Boost engagement ✦
        Track performance ✦ Optimize conversions ✦ Build brand loyalty ✦ Nurture relationships ✦
      </RunningString>
      
      <SectionFive/>
      
      <ScrollCarouselEffect bg="var(--green-1)">
        <ScrolledQuotes title={'Stay on brand'} bg="var(--green-8)">
          Achieve perfect brand consistency with ease. Our Branding Guidelines feature lets you seamlessly <br/>
          implement your approved brand elements across every touchpoint, from campaigns to internal materials.
        </ScrolledQuotes>
      </ScrollCarouselEffect>
      
      <SectionSix/>
      
      <LandingFooter/>
    </div>
  );
};
