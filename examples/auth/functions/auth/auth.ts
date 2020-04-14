import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import expressValidator from "express-validator";
import passport from "./passport";
import serverless from "serverless-http";

const base = process.env.LAMBDA_URL || ".netlify/functions";
const endpoint = `/${base}/${process.env.LAMBDA_AUTH_ENDPOINT || "auth"}`;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());

app.post(`${endpoint}/login`, async (req, res, next) => {
  req.assert("username", "Username is not valid").notEmpty();
  req.assert("password", "Password cannot be blank").notEmpty();

  const errors = req.validationErrors();
  if (errors) return res.status(400).json({ errors });

  return passport.authenticate("local", (errors, user) => {
    if (errors) return res.status(400).json({ errors });
    if (user) return res.status(200).json(user.getUser());

    return res.status(200);
  })(req, res, next);
});
app.get(`${endpoint}/signup`, async (req, res, next) => {
  return res.status(200).json({ body: req.body, query: req.query });
});

export const handler = serverless(app);
