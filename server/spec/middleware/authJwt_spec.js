jest.mock('jsonwebtoken')
const jsonwebtoken = require('jsonwebtoken')

const authJwt = require('middleware/authJwt')

describe('authJwt', () => {
  describe('#verifyToken', () => {
    let request
    let response

    beforeEach(() => {
      request = {
        headers: {}
      }
      response = {
        status: code => {
          response.code = code 
          return response
        },
        send: obj => {
          response.message = obj.message
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

    it('invalid token', () => { 
      request.headers["x-access-token"] = true
      const mockVerify = jest.fn((token, secret, callback) => {
        callback(true)
      })
      jsonwebtoken.verify = mockVerify
      authJwt.verifyToken(request, response)
      expect(response.code).toEqual(401)
      expect(response.message).toEqual("Unauthorized!")
    })
  })
})