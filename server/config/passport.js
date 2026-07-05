const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const User = require("../models/User");

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // ==========================================
  // Google Strategy
  // ==========================================

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {

          let user = await User.findOne({
            googleId: profile.id,
          });

          if (!user) {

            user = await User.findOne({
              email: profile.emails[0].value,
            });

            if (user) {

              user.googleId = profile.id;
              user.provider = "google";

              await user.save();

            } else {

              user = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos?.[0]?.value || "",
                provider: "google",
                isVerified: true,
              });

            }

          }

          return done(null, user);

        } catch (err) {

          return done(err, null);

        }
      }
    )
  );

  // ==========================================
  // GitHub Strategy
  // ==========================================

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/api/auth/github/callback`,
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {

          const email =
            profile.emails?.[0]?.value ||
            `${profile.username}@github.com`;

          let user = await User.findOne({
            githubId: profile.id,
          });

          if (!user) {

            user = await User.findOne({
              email,
            });

            if (user) {

              user.githubId = profile.id;
              user.provider = "github";

              await user.save();

            } else {

              user = await User.create({
                githubId: profile.id,
                name:
                  profile.displayName ||
                  profile.username,
                email,
                avatar: profile.photos?.[0]?.value || "",
                provider: "github",
                isVerified: true,
              });

            }

          }

          return done(null, user);

        } catch (err) {

          return done(err, null);

        }
      }
    )
  );

  // ==========================================
  // LinkedIn Strategy
  // ==========================================

  passport.use(
    new LinkedInStrategy(
      {
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/api/auth/linkedin/callback`,
        scope: ["r_emailaddress", "r_liteprofile"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {

          const email =
            profile.emails?.[0]?.value || "";

          let user = await User.findOne({
            linkedinId: profile.id,
          });

          if (!user) {

            user = await User.findOne({
              email,
            });

            if (user) {

              user.linkedinId = profile.id;
              user.provider = "linkedin";

              await user.save();

            } else {

              user = await User.create({
                linkedinId: profile.id,
                name: profile.displayName,
                email,
                avatar: profile.photos?.[0]?.value || "",
                provider: "linkedin",
                isVerified: true,
              });

            }

          }

          return done(null, user);

        } catch (err) {

          return done(err, null);

        }
      }
    )
  );

};