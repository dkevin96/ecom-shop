const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const { usersService } = require("../services");

const { fetchUserByEmail } = usersService;
const isProduction = process.env.NODE_ENV === "production";

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await usersService.fetchUserByEmail(email);
      if (!user) {
        return done(null, false, { message: "Incorrect email or password" });
      }

      const match = await bcrypt.compare(password, user.pwd_hash);
      if (!match) {
        return done(null, false, { message: "Incorrect email or password." });
      }

      return done(null, user, { message: "Logged in Successfully" });
    }
  )
);
