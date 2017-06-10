'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = require('react-transition-group');

var _transitions = require('./transitions');

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var ReactTransitions = function (_React$Component) {
  _inherits(ReactTransitions, _React$Component);

  function ReactTransitions() {
    _classCallCheck(this, ReactTransitions);

    return _possibleConstructorReturn(this, (ReactTransitions.__proto__ || Object.getPrototypeOf(ReactTransitions)).apply(this, arguments));
  }

  _createClass(ReactTransitions, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var width = _props.width;
      var height = _props.height;
      var transition = _props.transition;

      var restProps = _objectWithoutProperties(_props, ['children', 'width', 'height', 'transition']);

      if (!width || !height || !transition) {
        return null;
      }

      var _Transitions$find = _transitions2.default.find(function (t) {
        return transition === t.name;
      });

      var leave = _Transitions$find.leave;
      var leaveActive = _Transitions$find.leaveActive;
      var enter = _Transitions$find.enter;
      var enterActive = _Transitions$find.enterActive;
      var leaveTimeout = _Transitions$find.leaveTimeout;
      var enterTimeout = _Transitions$find.enterTimeout;


      var childComponents = _react2.default.Children.map(children, function (child, index) {
        return _react2.default.createElement(
          'div',
          { key: index, style: childWrapperStyle },
          child
        );
      });

      return _react2.default.createElement(
        _reactTransitionGroup.CSSTransitionGroup,
        _extends({
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
          transitionEnterTimeout: enterTimeout
        }, restProps),
        childComponents
      );
    }
  }]);

  return ReactTransitions;
}(_react2.default.Component);

ReactTransitions.propTypes = {
  children: function children(props, propName, componentName) {
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
  transition: _propTypes2.default.oneOf(TransitionNames).isRequired,
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired
};

module.exports = ReactTransitions;
module.exports.Transitions = TransitionNames;