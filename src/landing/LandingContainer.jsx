import React, {Component} from 'react';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SectionsContainer, Section} from 'react-fullpage';

// Components
import SlideshowContainer from './shared/containers/Slideshow/SlideshowContainer';
// import {DukovAppealSectionComponent} from './shared/components/sections/DukovAppeal/DukovAppealSectionComponent';
// import {InformationSectionComponent} from './shared/components/sections/Information/InformationSectionComponent';
import {DukovReviewSectionComponent} from './shared/components/sections/DukovReview/DukovReviewSectionComponent';
import {DeminReviewSectionComponent} from './shared/components/sections/DeminReview/DeminReviewSectionComponent';
import {CallToActionSectionComponent} from './shared/components/sections/CallToAction/CallToActionSectionComponent';
import {WinnerElbrusSectionComponent} from './shared/components/sections/WinnerElbrus/WinnerElbrusSectionComponent';
import {WinnerInterviewSectionComponent} from './shared/components/sections/WinnerInterview/WinnerInterviewSectionComponent';

// Constants
import {fullpageOptions} from './LandingConstants';

class LandingComponent extends Component {
  render() {
    return (
      <SectionsContainer
        {...fullpageOptions}
        anchors= {[
          // 'dukovAppealSection',
          // 'informationSection',
          'slideshowSection',
          'callToActionSection',
        ]}
      >
        {/* <Section>
          <DukovAppealSectionComponent />
        </Section> */}

        {/* <Section>
          <InformationSectionComponent />
        </Section> */}
        
        <Section>
          <SlideshowContainer>
            <DeminReviewSectionComponent />
            <WinnerInterviewSectionComponent />
            <WinnerElbrusSectionComponent />
          </SlideshowContainer>
        </Section>

        <Section>
          <CallToActionSectionComponent />
        </Section>
      </SectionsContainer>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  goToPortal: () => push('/portal')
}, dispatch);

export default connect(null, mapDispatchToProps)(LandingComponent);