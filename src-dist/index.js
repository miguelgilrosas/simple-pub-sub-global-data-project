/**
 * This code is purposely written in old-fashioned style (ES6, ES2015). This is done so that it is not necessary to add
 * transpilation dependencies.
 *
 * Este código está escrito a propósito en estilo anticuado (ES6, ES2015). Se hace así para que no sea necesario añadir
 * dependencias de transpilación.
 */

'use strict'

const globalEnvironment = typeof window === 'object' ? window : global
let SimplePubSubGlobalData

if (globalEnvironment.SimplePubSubGlobalData) {
	SimplePubSubGlobalData = globalEnvironment.SimplePubSubGlobalData
}
else {
	SimplePubSubGlobalData = {
		_data: {
			pubSubStructure: {
				subscriptions: {}
			},
			data: {},
		},

		getAllData: function() {
			return this._data.data
		},

		getData: function(item) {
			return this._data.data[item]
		},

		setData: function(item, value) {
			this._data.data[item] = value
		},

		removeData: function(item) {
			delete this._data.data[item]
		},

		removeAllData: function() {
			this._data.data = {}
		},

		subscribe: function(event, func, sync = false) {
			const subs = this._data.pubSubStructure.subscriptions
			if (subs[event]) {
				subs[event].push([func, sync])
			}
			else {
				subs[event] = [[func, sync]]
			}
		},

		unsubscribe: function(event, func) {
			let funcDataList = this._data.pubSubStructure.subscriptions[event]
			if (funcDataList !== undefined ) {
				funcDataList = funcDataList
					.filter(funcData => funcData[0] !== func)

				if (funcDataList.length === 0) {
					delete this._data.pubSubStructure.subscriptions[event]
					return
				}

				this._data.pubSubStructure.subscriptions[event] = funcDataList
			}
		},

		publish: function(event, data) {
			const funcList = this._data.pubSubStructure.subscriptions[event]
			if (funcList !== undefined) {
				funcList.forEach(funcData => {
					if (funcData[1]) {
						funcData[0](data)
					}
					else {
						setTimeout(funcData[0], 0, data)
					}
				})
			}
		}
	}

	// To allow imports or requires in destructuring form, ex.: import { getData } from 'simple-pub-sub-global-data'
	Object.keys(SimplePubSubGlobalData)
		.filter(k => typeof SimplePubSubGlobalData[k] === 'function')
		.forEach(k => SimplePubSubGlobalData[k] = SimplePubSubGlobalData[k].bind(SimplePubSubGlobalData))

	globalEnvironment.SimplePubSubGlobalData = SimplePubSubGlobalData
}

if (typeof module === 'object') {
	module.exports = SimplePubSubGlobalData
}
