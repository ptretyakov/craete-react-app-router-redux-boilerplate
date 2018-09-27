import React, {Component} from 'react';
import {Section} from 'react-fullpage';
import {Animated} from 'react-animated-css';

// Constants
import {
  INFORMATION_ITEMS, INFORMATION_TEXT,
  INFORMATION_TITLE, INFORMATION_LEADERS,
} from './InformationSectionComponentConstants';

// Images
import vectorImage from './shared/images/vector.svg';

import './InformationSectionComponent.scss';

export class InformationSectionComponent extends Component {
  render() {
    const InformationItems = (
      <div className="information-section__items">
        {(() => {
          return INFORMATION_ITEMS.map((item) => {
            return(
              <div className="information-section__items-item">
                <div className="information-section__items-image">
                  <img src={vectorImage} />
                </div>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                  <div className="information-section__items-text">
                    {item}
                  </div>
                </Animated>
              </div>
            );
          });
        })()}         
      </div>
    )

    const informationText = INFORMATION_TEXT.map(item => <p>{item}</p>);

    return (
      <Section>
        <div className="information-section__wrapper">
          <div className="information-section__left-content">
            <p className="information-section__title">
              <span className="blue-text">
               {INFORMATION_LEADERS}
               </span> {INFORMATION_TITLE}
            </p>
            <div className="information-section__description">
              <div className="information-section__description-text">
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                  {informationText}
                </Animated>
              </div>

              {InformationItems}
            </div>
          </div>
        </div>
      </Section>
    );
  }
}