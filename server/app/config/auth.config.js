const SITE_SECRET = process.env.SITE_SECRET;

module.exports = {
  secret: SITE_SECRET,
  expiresIn: 86400,
  tokenCookieOptions: {
    secure: (process.env.NODE_ENV === 'production'),
    sameSite: true,
    httpOnly: true,
    signed: true
  }
};