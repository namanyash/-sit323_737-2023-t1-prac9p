const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

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

router.post(
  "/add",
  [
    //validations
    check("a", "Value 'A' is not a number").isNumeric(),
    check("b", "Value 'B' is not a number").isNumeric(),
    auth,
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Show error if validations failed
      logger.log({
        level: "error",
        message: `Invalid Input: ${errors.array}`,
      });
      return res.status(400).json({ errors: errors.array() });
    }
    const { a, b } = req.body;
    logger.log({
      level: "info",
      message: `Add a=${a} b=${b}`,
    });
    return res.status(200).send({ result: `${parseInt(a) + parseInt(b)}` });
  }
);
router.post(
  "/subtract",
  [
    //validations
    check("a", "Value 'A' is not a number").isNumeric(),
    check("b", "Value 'B' is not a number").isNumeric(),
    auth,
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Show error if validations failed
      logger.log({
        level: "error",
        message: `Invalid Input: ${errors.array}`,
      });
      return res.status(400).json({ errors: errors.array() });
    }
    const { a, b } = req.body;
    logger.log({
      level: "info",
      message: `Subtract a=${a} b=${b}`,
    });
    return res.status(200).send({ result: `${parseInt(a) - parseInt(b)}` });
  }
);
router.post(
  "/divide",
  [
    //validations
    check("a", "Value 'A' is not a number").isNumeric(),
    check("b", "Value 'B' is not a number").isNumeric(),
    auth,
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Show error if validations failed
      logger.log({
        level: "error",
        message: `Invalid Input: ${errors.array}`,
      });
      return res.status(400).json({ errors: errors.array() });
    }
    const { a, b } = req.body;
    logger.log({
      level: "info",
      message: `Divide a=${a} b=${b}`,
    });
    return res.status(200).send({ result: `${parseInt(a) / parseInt(b)}` });
  }
);
router.post(
  "/multiply",
  [
    //validations
    check("a", "Value 'A' is not a number").isNumeric(),
    check("b", "Value 'B' is not a number").isNumeric(),
    auth,
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Show error if validations failed
      logger.log({
        level: "error",
        message: `Invalid Input: ${errors.array}`,
      });
      return res.status(400).json({ errors: errors.array() });
    }
    const { a, b } = req.body;
    logger.log({
      level: "info",
      message: `Multiply a=${a} b=${b}`,
    });
    return res.status(200).send({ result: `${parseInt(a) * parseInt(b)}` });
  }
);
module.exports = router;
