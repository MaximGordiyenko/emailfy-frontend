import { SectionFirst } from './SectionFirst.jsx';
import { SectionFour } from './SectionFour.jsx';
import { LandingFooter } from './LandingFooter.jsx';
import './styles.css';
import ScrollCarouselEffect from './hooks.jsx';
import { SectionSix } from './SectionSix/SectionSix.jsx';
import { ScrolledQuotes } from './ScrolledQuotes.jsx';
import { RunningString } from '../../components/runners/RunningString.jsx';
import { SectionFive } from './SectionFive/SectionFive.jsx';

export const LandingPage = () => {
  return (
    <div id="landing-page" className={`landing-page`}>
      <SectionFirst/>
      
      <ScrollCarouselEffect>
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
      
      <ScrollCarouselEffect>
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
