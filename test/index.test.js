const request = require("supertest");
const moment = require('moment');
const { server } = require("../server/index");

describe('Request to the server', () => {
  it('should make successfully request to server', (done) => {

    request(server)
      .post('/echoAtTime')
      .send({
        time: moment().add(5, 'seconds').format('YYYY-MM-DDTHH:mm:ss'),
        message: 'Message 1'
      })
      .expect(200, {
        success: true
      }, done);
  });

  it('should make request with invalid data', (done) => {

    request(server)
      .post('/echoAtTime')
      .send({
        time: 'hello',
        message: 'Message 2'
      })
      .expect(400, {
        success: false,
        message:  "child \"time\" fails because [\"time\" must be a number of milliseconds or valid date string]"
      }, done);
  });
});