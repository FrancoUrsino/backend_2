export const cookieExtractor = (req) => {
  if (req && req.cookies) {
    return req.cookies.jwtCookieToken;
  }
  return null;
};