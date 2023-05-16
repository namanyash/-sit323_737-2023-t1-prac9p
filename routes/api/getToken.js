const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");

const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "calculator-microservice" },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

router.get(
  "/getToken",
  [
    //validations
  ],
  (req, res) => {
    // create payload for jwt token
    const payload = {
      user: {
        id: "1234",
      },
    };
    try {
      // create and return a jwt token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      // catch and log errors in console. Send 500 response
      logger.log({
        level: "error",
        message: `/getToken Server Error ${err}`,
      });
      return res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
