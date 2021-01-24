// const app = require('../../../server/index.js') // Link to your server file
import {app } from '../../../server/index.js'

const request = require('supertest')

describe ('Testing post endpoint', () => {
  it('expect new post is created', async () => {
  const res = await request(app)
  .post('./getTripDetails')
  .send({
    destination: 'Singapore',
    icon: [
      'r02d', 'r01d' ],
    temp: [ 
        29.3, 27.2 
      ],
    dateStart: 'Tue Jan 19 2021 22:00:00 GMT+0800 (Malaysia Time)',
    dateEnd: 'Thu Jan 21 2021 12:00:00 GMT+0800 (Malaysia Time)'
  })
  expect(res.statusCode).toEqual(201) // check if request was successful
  expect(res.body).toHaveProperty('destination') // check if response returned value of projectData
})
})