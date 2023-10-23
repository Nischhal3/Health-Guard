"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const { userLogin } = require("../model/userModel");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcrypt");

// local strategy for email and password login
passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      const params = [username];
      try {
        const [user] = await userLogin(params);
        if (user === undefined) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        delete user.password;
        return done(null, { ...user }, { message: "Logged In Successfully" });
      } catch (err) {
        return done(err);
      }
    }
  )
);
// JWT strategy for handing bearer token
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      return done(null, jwtPayload);
    }
  )
);

module.exports = passport;
