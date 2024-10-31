# simple-pub-sub-global-data &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)
A very, very simplistic pub-sub and global data library without dependencies or complications.

Works in browser and Node (not tested in Deno).

## Usage

```bash
npm install simple-pub-sub-global-data
```
then
```html
<script src="path-to-node_modules/simple-pub-sub-global-data/src-dist/index.js"></script>
```
or
```js
import Spsgd from 'simple-pub-sub-global-data'
```
or
```js
import { getData } from 'simple-pub-sub-global-data'
// 'getData' or any of the methods
```
or
```js
const Spsgd = require('simple-pub-sub-global-data')
```
or
```js
const { getData } = require('simple-pub-sub-global-data')
// 'getData' or any of the methods
```

## Methods

### Data Store

* **getAllData()**

* **getData(key: string)**
  
* **removeAllData()**

* **removeData(key: string)**

* **setData(key: string, data: any)**

### Pub - Sub

* **publish(event: string, data: any = undefined)**

    Publish an 'event' and, optionally, send 'data' to subscriptors as argument.

* **subscribe(event: string, func: function, sync: boolean = false)**

    Subscribe a function or method 'func' to an 'event'. It is possible to choose the way 'func' will be called,
    synchronous or asynchronous, by setting optional argument 'sync'. 'sync = true' means the subscriptors will be
    called inmediately after 'event' publication. 'sync = false' means the call for subscriptors will be made by the
    javascript event loop (so the app/component state can update, or UI can refresh, ...).

* **unsubscribe(event: string, func: function)**

#### Notes:

* To 'unsubscribe' with success, the function has to be a named one.

* If a function has been subscribed inside a class, component or any code container that can be destroyed, that function
HAS TO BE UNSUBSCRIBED before destruction.

## Contraindication

This library creates a variable in the global scope named '**SimplePubSubGlobalData**', so do not use that name in global
scope.

