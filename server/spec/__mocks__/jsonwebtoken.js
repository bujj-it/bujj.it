const jsonwebtoken = {
  verify: (token, secret, callback) => {
    callback(false, {
      id: 'test.id'
    })
  }
}

module.exports = jsonwebtoken