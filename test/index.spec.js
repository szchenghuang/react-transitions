import { assert } from 'chai';
import sinon from 'sinon';
import jsdomGlobal from 'jsdom-global';

jsdomGlobal();

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTransitions from '../src/index';
import { mount } from 'enzyme';

const Transitions = ReactTransitions.Transitions;
// ids are added for .contains to differentiate these two elements.
const childOne = <div key="one" id="one" />;
const childTwo = <div key="two" id="two" />;

const bypassPropTypesCache = () => {
    ReactTransitions.displayName = 'ReactTransitions Instance-' + bypassPropTypesCache.called++;
};
bypassPropTypesCache.called = 0;

describe( 'react-transitions', function() {
    describe( 'Feature set', function() {
        let Component, spied;

        beforeEach( () => {
            bypassPropTypesCache();
            Component = props => (
                <ReactTransitions
                    transition={ Transitions[ 0 ] }
                    width={ 100 }
                    height={ 100 }>
                    { props.child }
                </ReactTransitions>
            );
            spied = sinon.spy( console, 'error' );
        });

        afterEach( () => {
            spied = undefined;
            console.error.restore();
        });

        it( 'should have transition options', function() {
            assert.isTrue( 0 < Transitions.length );
        });

        it( 'should be fine when there are no children', function() {
            mount( <Component /> );
            assert.isFalse( console.error.called );
        });

        it( 'should warn when there are multiple children', function() {
            mount( <Component child={ [ childOne, childTwo ] } /> );
            assert.equal( console.error.callCount, 1 );
        });

        it( 'should warn when the key is not provided on the child', function() {
            mount( <Component child={ <div /> } /> );
            assert.equal( console.error.callCount, 1 );
        });

        it( 'should warn when required props are not provided', function() {
            mount( <ReactTransitions /> );
            assert.equal( console.error.callCount, 3 );
        });

        it( 'should warn when dimension is not provided', function() {
            mount( <ReactTransitions transition={ Transitions[ 0 ] } /> );
            assert.equal( console.error.callCount, 2 );

            spied.reset();
            bypassPropTypesCache();
            mount( <ReactTransitions transition={ Transitions[ 0 ] } width={ 100 } /> );
            assert.equal( console.error.callCount, 1 );

            spied.reset();
            bypassPropTypesCache();
            mount( <ReactTransitions transition={ Transitions[ 0 ] } height={ 100 } /> );
            assert.equal( console.error.callCount, 1 );
        });

        it( 'should warn when transition is not provided', function() {
            mount( <ReactTransitions width={ 100 } height={ 100 } /> );
            assert.equal( console.error.callCount, 1 );
        });

        it( 'should transition happen', function( done ) {
            const container = mount( <Component child={ childOne } /> );

            assert.isTrue( container.contains( childOne ) );

            container.setProps({ child: childTwo });

            // The leaving child should stick around during transition.
            assert.isTrue( container.contains( childOne ) );
            assert.isTrue( container.contains( childTwo ) );

            setTimeout( () => {
                // The leaving child should be removed from DOM.
                assert.isFalse( container.contains( childOne ) );
                assert.isTrue( container.contains( childTwo ) );
                done();
            }, 1000 );
        });

        it( 'should transition happen', function() {
            const container = mount( <Component /> );

            assert.lengthOf( container.children(), 0 );

            container.setProps({ child: childOne });

            assert.isTrue( container.contains( childOne ) );
        });
    });
});
