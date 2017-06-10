'use strict';

import '../dist/animations.css';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTransitions, { Transitions } from '../';

const centeredStyle = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%'
};
const noWrapStyle = {
  whiteSpace: 'nowrap'
};
const childStyle = {
  width: 600,
  height: 400,
  backgroundColor: 'powderblue'
};
const divGrandStyle = {
  textAlign: 'center',
  fontFamily: '"Lato", Calibri, Arial, sans-serif',
  fontSize: 60,
  color: '#fff'
};
const divCenteredGrandStyle = {
  ...divGrandStyle,
  ...centeredStyle
};
const divSemiGrandStyle = {
  ...divGrandStyle,
  height: '50%',
  position: 'relative'
};
const divSemiGrandUpStyle = {
  ...divSemiGrandStyle,
  backgroundColor: 'lightpink'
};
const divSemiGrandDownStyle = {
  ...divSemiGrandStyle,
  backgroundColor: 'lightgreen',
  ...noWrapStyle
};

const Comps = [
  <img src={ require( './images/1.jpg' ) } style={ childStyle } />,
  <img src={ require( './images/2.jpg' ) } style={ childStyle } />,
  <div style={ childStyle }>
    <div style={ divCenteredGrandStyle }>Hi, there</div>
  </div>,
  <div style={ childStyle }>
      <div style={ divSemiGrandUpStyle }>
        <div style={ centeredStyle }>I am</div>
      </div>
      <div style={ divSemiGrandDownStyle }>
        <div style={ centeredStyle }>react-transitions</div>
      </div>
  </div>
];

class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      clicked: 0,
      transition: Transitions[ 0 ]
    };
  }
  render() {
    const index = this.state.clicked % Comps.length;
    const comp = React.cloneElement( Comps[ index ], { key: index } );

    return (
      <div>
        <p>
          <select onChange={ event => this.setState( { transition: event.target.value } ) }>
          { Transitions.map( ( transition, index ) => (
            <option key={ index } value={ transition }>
              { `${index + 1}: ${transition}` }
            </option>
          ))}
          </select>
          &nbsp;<button onClick={ () => this.setState( { clicked: this.state.clicked + 1 } ) }>Animate</button>
        </p>
        <ReactTransitions
          width={ 600 }
          height={ 400 }
          transition={ this.state.transition }
        >
          { comp }
        </ReactTransitions>
        <p>Transition name: <strong>{ this.state.transition }</strong></p>
      </div>
    );
  }
}

window.onload = () => ReactDOM.render( <App />, document.querySelector( '#container' ) );
