jest.mock('jsonwebtoken')

const authJwt = require('middleware/authJwt')

describe('authJwt', () => {
  describe('#verifyToken', () => {
    let request
    let response

    beforeEach(() => {
      request = {
        headers: {}
      }
      const send = {
        send: obj => {
          response.message = obj.message
        }
      }
      response = {
        status: code => {
          response.code = code 
          return send
        },
        code: null,
        message: null
      }
    })

    it('no token provided in header', () => { 
      authJwt.verifyToken(request, response)
      expect(response.code).toEqual(403)
      expect(response.message).toEqual("No token provided!")
    })
  })
})