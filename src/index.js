'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Transitions from './transitions';

const TransitionNames = Transitions.map( transition => transition.name );

const childWrapperStyle = {
  position: 'absolute',
  display: 'inline-block',
  opacity: 1,
  transform: 'translate3d(0, 0, 0)',
  transformStyle: 'preserve-3d',
  backfaceVisibility: 'hidden'
};

class ReactTransitions extends React.Component {
  render() {
    const {
      children,
      width,
      height,
      transition,
      ...restProps
    } = this.props;

    if ( !width || !height || !transition ) {
      return null;
    }

    const {
      leave, leaveActive,
      enter, enterActive,
      leaveTimeout, enterTimeout
    } = Transitions.find( t => transition === t.name );

    return (
      <ReactCSSTransitionGroup
        component="div"
        style={{
          perspective: 1200,
          position: 'relative',
          overflow: 'hidden',
          width,
          height
        }}
        transitionName={{
          leave,
          leaveActive: leaveActive || '',
          enter,
          enterActive: enterActive || ''
        }}
        transitionLeaveTimeout={ leaveTimeout }
        transitionEnterTimeout={ enterTimeout }
        { ...restProps }
      >
        { React.Children.map( children, child => (
          <div style={ childWrapperStyle }>
            { child }
          </div>
        ))}
      </ReactCSSTransitionGroup>
    );
  }
}

ReactTransitions.propTypes = {
  children: ( props, propName, componentName ) => {
    if ( props[ propName ] == null ) {
      return null;
    }

    if ( React.Children.count( props[ propName ] ) > 1 ) {
      return new Error(
        `Invalid \`${propName}\` supplied to ` +
        `\`${componentName}\`, expected a single ReactElement.`
      );
    }

    const child = React.Children.only( props[ propName ] );

    if ( !React.isValidElement( child ) ) {
      return new Error(
        `Child \`${propName}\` in ` +
        `\`${componentName}\` is not a valid React element.`
      );
    }

    if ( !child.key ) {
      return new Error(
        `Key is not provided to \`${propName}\` in ` +
        `\`${componentName}\`.`
      );
    }

    return null;
  },
  transition: PropTypes.oneOf( TransitionNames ).isRequired,
  width: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ).isRequired,
  height: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ).isRequired
};

module.exports = ReactTransitions;
module.exports.Transitions = TransitionNames;
