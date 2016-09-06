'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _transitions = require('./transitions');

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TransitionNames = _transitions2.default.map(function (transition) {
  return transition.name;
});

var childWrapperStyle = {
  position: 'absolute',
  display: 'inline-block',
  opacity: 1,
  transform: 'translate3d(0, 0, 0)',
  transformStyle: 'preserve-3d',
  backfaceVisibility: 'hidden'
};

var ReactTransitions = _react2.default.createClass({
  displayName: 'ReactTransitions',

  propTypes: {
    children: function children(props, propName, componentName /*, location, propFullName*/) {
      if (props[propName] == null) {
        return null;
      }

      if (_react2.default.Children.count(props[propName]) > 1) {
        return new Error('Invalid `' + propName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
      }

      var child = _react2.default.Children.only(props[propName]);

      if (!_react2.default.isValidElement(child)) {
        return new Error('Child `' + propName + '` in ' + ('`' + componentName + '` is not a valid React element.'));
      }

      if (!child.key) {
        return new Error('Key is not provided to `' + propName + '` in ' + ('`' + componentName + '`.'));
      }

      return null;
    },
    transition: _react.PropTypes.oneOf(TransitionNames).isRequired,
    width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]).isRequired,
    height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]).isRequired
  },
  render: function render() {
    var _props = this.props;
    var width = _props.width;
    var height = _props.height;
    var transitionName = _props.transition;


    if (!width || !height || !transitionName) {
      return null;
    }

    var transition = _transitions2.default.find(function (transition) {
      return transitionName === transition.name;
    });
    var leave = transition.leave;
    var leaveActive = transition.leaveActive;
    var enter = transition.enter;
    var enterActive = transition.enterActive;
    var leaveTimeout = transition.leaveTimeout;
    var enterTimeout = transition.enterTimeout;


    return _react2.default.createElement(
      _reactAddonsCssTransitionGroup2.default,
      {
        component: 'div',
        style: {
          perspective: 1200,
          position: 'relative',
          overflow: 'hidden',
          width: width,
          height: height
        },
        transitionName: {
          leave: leave,
          leaveActive: leaveActive || '',
          enter: enter,
          enterActive: enterActive || ''
        },
        transitionLeaveTimeout: leaveTimeout,
        transitionEnterTimeout: enterTimeout },
      _react2.default.Children.map(this.props.children, function (child) {
        return _react2.default.createElement(
          'div',
          { style: childWrapperStyle },
          child
        );
      })
    );
  }
});

// #############################################################################
// Exports.
// #############################################################################
module.exports = ReactTransitions;
module.exports.Transitions = TransitionNames;