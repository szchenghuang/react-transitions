'use strict';

//#############################################################################
// Stylesheets.
//#############################################################################
import '../dist/animations.css';

//#############################################################################
// Library includes.
//#############################################################################
import React from 'react';
import ReactTransitions from '../';
const Transitions = ReactTransitions.Transitions;

//#############################################################################
// Application includes.
//#############################################################################

//#############################################################################
// Constants.
//#############################################################################

//#############################################################################
// React components.
//#############################################################################
const childStyle = {
  width: 600,
  height: 400,
  textAlign: 'center',
  fontFamily: '"Lato", Calibri, Arial, sans-serif',
  fontSize: 80,
  color: '#fff'
};

const Comps = [
  <img src={ require( './images/1.jpg' ) } style={ childStyle } />,
  <img src={ require( './images/2.jpg' ) } style={ childStyle } />,
  <img src={ require( './images/3.jpg' ) } style={ childStyle } />,
  <div style={ Object.assign( {}, childStyle, { backgroundColor: 'mediumturquoise' } ) } />,
  <div style={ childStyle }>
      <div style={{
        height: '50%',
        backgroundColor: 'lightgreen'
      }} />
      <div style={{
        height: '50%',
        backgroundColor: 'lightpink'
      }} />
  </div>
];

const App = React.createClass({
  getInitialState() {
    return {
      clicked: 0,
      transition: Transitions[ 0 ]
    };
  },
  render() {
    const index = this.state.clicked % Comps.length;
    const comp = React.cloneElement( Comps[ index ], { key: index } );

    return (
      <div>
        <p>
          <select onChange={ event => this.setState({ transition: event.target.value }) }>
          { Transitions.map( ( transition, index ) => (
            <option key={ index } value={ transition }>
              { `${index + 1}: ${transition}` }
            </option>
          ))}
          </select>
          &nbsp;<button onClick={ () => this.setState({ clicked: this.state.clicked + 1 }) }>Animate</button>
        </p>
        <ReactTransitions
          width={ childStyle.width }
          height={ childStyle.height }
          transition={ this.state.transition }>
          { comp }
        </ReactTransitions>
        <p>Transition name: <strong>{ this.state.transition }</strong></p>
      </div>
    );
  }
});

//#############################################################################
// Exports.
//#############################################################################
export default App;
