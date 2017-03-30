# react-transitions #

[![Build Status][travis_img]][travis_site]
[![NPM Package][npm_img]][npm_site]
[![Dependency status][david_img]][david_site]
[![devDependency status][david_dev_img]][david_dev_site]

A collection of transitions to animate React components when they enter or leave the DOM.

## [Demo][demo] ##

Check out the live [demo][demo] for available built-in animations.

## Installation ##

```sh
npm install -s react-transitions
```

## Usage ##

### Import the component
```js
import ReactTransitions from 'react-transitions';
```
### Import the CSS animations

If your project has set up appropriate CSS loaders, just import the CSS
```js
import 'react-transitions/dist/animations.css';
```

If you need to include the stylesheet otherwise, associate the file [here][animations_css].

### Render
```js
<ReactTransitions
  transition="move-to-left-move-from-right"
  width={ 600 }
  height={ 300 }
>
  {/* The child element put here changes with animation. */}
  <img key="uniqueKey" src="..." />
</ReactTransitions>
```

ReactTransitions Props | Type | Description
---------------------- | ---- | -----
transition | string, **_required_** | See [transitions](#transitions)
width | number (in px) or string, **_required_** |
height | number (in px) or string, **_required_** |
childern | element, or null | **Restricted to a single element in that it is animated as a whole.**

## <a name="transitions"></a>Transitions
This package comes with a set of animated transitions out of the box. `ReactTransitions.Transitions`
makes a list of their names. Each name is a string to be supplied to `transition` prop of `ReactTransitions`.

Here are a few of the names for illustration:

* "move-to-left-move-from-right",
* "fade-move-from-right",
* "scale-down-move-from-right",
* "rotate-right-side-first-move-from-right"

There are some more options ready for you. Either make use of the [demo][demo] page to see the full list, or dump
the contents of `ReactTransitions.Transitions` which should always be up-to-date.

## Acknowledgement ##
The CSS aminations used in this package are based on [resources][codrops_pkg] on [Codrops][codrops] with
adequate adoption for React. Thanks for the awesome creation shared by Codrops.

## License ##

MIT. See [LICENSE.md](http://github.com/szchenghuang/react-transitions/blob/master/LICENSE.md) for details.

[demo]: https://szchenghuang.github.io/react-transitions/
[animations_css]: https://github.com/szchenghuang/react-transitions/tree/master/src/animations.css
[codrops_pkg]: https://github.com/codrops/PageTransitions
[codrops]: https://tympanus.net/codrops
[travis_img]: https://travis-ci.org/szchenghuang/react-transitions.svg?branch=master
[travis_site]: https://travis-ci.org/szchenghuang/react-transitions
[npm_img]: https://img.shields.io/npm/v/react-transitions.svg
[npm_site]: https://www.npmjs.org/package/react-transitions
[david_img]: https://david-dm.org/szchenghuang/react-transitions/status.svg
[david_site]: https://david-dm.org/szchenghuang/react-transitions/
[david_dev_img]: https://david-dm.org/szchenghuang/react-transitions/dev-status.svg
[david_dev_site]: https://david-dm.org/szchenghuang/react-transitions/?type=dev
