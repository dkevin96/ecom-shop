const passport = require("passport");
const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const { usersService, cartsService } = require("../services");
const {
  createUser,
  fetchUserByEmail,
  fetchUserByGoogleId,
  addGoogleIdUser,
  fetchUserByFacebookId,
  addFacebookIdUser,
} = usersService;
const { createCart } = cartsService;

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
        return done(null, false, { message: "Invalid User!" });
      }

      const match = await bcrypt.compare(password, user.pwd_hash);
      if (!match) {
        return done(null, false, { message: "Invalid email or password!" });
      }

      return done(null, user, { message: "Logged in Successfully" });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: isProduction
        ? process.env.GOOGLE_CALLBACK_URL
        : "/api/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleUser = await fetchUserByGoogleId(profile.id);
      if (googleUser) {
        return done(null, googleUser, { message: "User found" });
      } else {
        //Check if we have an active user with this email and add google_id
        const userDb = await fetchUserByEmail(profile.emails[0].value);
        if (userDb?.active) {
          const googleUser = {
            id: userDb.id,
            facebook_id: profile.id,
          };
          const newGoogleUser = await addGoogleIdUser(googleUser);
          return done(null, newGoogleUser, {
            message: "Google login added to user",
          });
        }

        const user = {
          email: profile.emails[0].value,
          facebook_id: profile.id,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          user_role: "admin",
        };
        const newUser = await createUser(user);
        const newCart = await createCart(newUser.id);
        newUser.cart_id = newCart.id; //Attach cart_id to the newUser object so it can appear in JWT cookie on first login
        return done(null, newUser, { message: "New user created" });
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: isProduction
        ? process.env.FACEBOOK_CALLBACK_URL
        : "/api/auth/facebook/redirect",
      profileFields: ["id", "email", "name"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, email, first_name, last_name } = profile._json;
      const facebookUser = await fetchUserByFacebookId(id);
      if (facebookUser) {
        return done(null, facebookUser, { message: "User Facebook found" });
      } else {
        //Check if we have an active user with this email and add facebook_id
        const userDb = await fetchUserByEmail(email);
        if (userDb?.active) {
          const facebookUser = {
            id: userDb.id,
            facebook_id: id,
          };
          const newfacebookUser = await addFacebookIdUser(facebookUser);
          return done(null, newfacebookUser, {
            message: "Facebook login added to user",
          });
        }

        // Order is important, order in user object must match order in createUserDb = async ({..})
        const user = {
          email: email,
          facebook_id: id,
          first_name: first_name,
          last_name: last_name,
          user_role: "admin",
        };
        const newUser = await createUser(user);
        const newCart = await createCart(newUser.id);
        newUser.cart_id = newCart.id; //Attach cart_id to the newUser object so it can appear in JWT cookie on first login
        return done(null, newUser, { message: "New user created" });
      }
    }
  )
);

// Checks the A_JWT cookie
passport.use(
  "jwt-customer",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_KEY,
      jwtFromRequest: ExtractJWT.fromExtractors([
        (req) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies["A_JWT"];
          } else {
            console.log("no cookie");
          }
          return token;
        },
      ]),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

//   //Checks the A_JWT cookie and if a user has user_role = admin
passport.use(
  "jwt-admin",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_KEY,
      jwtFromRequest: ExtractJWT.fromExtractors([
        (req) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies["A_JWT"];
          }
          return token;
        },
      ]),
    },
    async (token, done) => {
      if (token.user.role !== "admin") {
        //Reject if not admin
        return done(null, false);
      }
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
