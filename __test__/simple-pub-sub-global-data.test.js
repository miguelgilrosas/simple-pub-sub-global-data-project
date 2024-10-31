'use strict'

const One = require('./tests-aux/one')
	, Two = require('./tests-aux/two')
	, { setData, getData } = require('..')

describe('Data store', () => {
	test('Save and retrieve', () => {
		setData('value1', 'Hello World')
		expect(getData('value1')).toEqual('Hello World')

		One.setData('value2', 42)
		expect(Two.getData('value2')).toEqual(42)

		One.setData('value3', [1, 2, 3])
		expect(Two.getData('value3')).toEqual([1, 2].concat([3]))

		One.setData('value3', [1, 2, 4])
		expect(Two.getData('value3')).toEqual([1, 2].concat([4]))
		expect(Two.getData('value3')).not.toEqual([1, 2].concat([3]))
	})

	test('Retrieve unsaved data', () => {
		expect(Two.getData('value4')).toBeUndefined()
	})

	test('Remove', () => {
		One.removeData('value1')
		expect(Two.getData('value1')).toBeUndefined()

		One.removeAllData()
		expect(Two.getData('value2')).toBeUndefined()
		expect(Two.getData('value3')).toBeUndefined()
		expect(Two.getAllData()).toEqual({})
	})
})

describe('Sync mode Pub-Sub', () => {
	test('Subscribe and publish', () => {
		One.subscribe('testS1', data => One.setData('testS1', data), true)
		Two.publish('testS1', 'Yes')
		expect(Two.getData('testS1')).toEqual('Ye' + 's')

		// To test: Publish an event does not run functions subscribed with another event
		Two.publish('testS2', 'No')
		expect(Two.getData('testS1')).not.toEqual('N' + 'o')
	})

	test('Unsusbscribe', () => {
		function testS3(data) {
			One.setData('testS3', data)
		}

		One.subscribe('testS3', testS3, true)

		Two.unsubscribe('testS3', testS3)
		Two.publish('testS3', 'Up')
		expect(Two.getData('testS3')).not.toEqual('U' + 'p')
	})
})

describe('Async mode Pub-Sub', () => {
	test('Subscribe and publish', () => {
		One.subscribe('testA1', data => One.setData('testA1', data))
		Two.publish('testA1', 'Yes')
		setTimeout(
			() =>
				expect(Two.getData('testA1')).toEqual('Ye' + 's'),
			0
		)
		expect(Two.getData('testA1')).not.toEqual('Ye' + 's')

		// To test: Publish an event does not run functions subscribed with another event
		Two.publish('testA2', 'No')
		setTimeout(
			() =>
				expect(Two.getData('testA1')).not.toEqual('N' + 'o'),
			0
		)
	})

	test('Unsusbscribe', () => {
		function testA3(data) {
			One.setData('testA3', data)
		}

		One.subscribe('testA3', testA3)

		Two.unsubscribe('testA3', testA3)
		Two.publish('testA3', 'Up')
		setTimeout(
			() =>
				expect(Two.getData('testA3')).not.toEqual('U' + 'p')
			, 0
		)
	})
})
