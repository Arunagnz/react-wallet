const express = require("express");
const { body, param, validationResult } = require("express-validator");
const Transaction = require("../model/transaction");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await Transaction.findAll({
      order: [["created_at", "DESC"]],
    });
    res.json({ success: true, count: result.length, data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, Error: "Internal server error" });
  }
});

router.get(
  "/:id",
  param("id").trim().isUUID().withMessage("id must be an UUIDV6"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .json({ errors: errors.array().map((error) => error.msg) });
      const result = await Transaction.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (result !== null) {
        return res.json({ success: true, data: result });
      } else
        return res
          .status(404)
          .json({ success: false, message: "Transaction not found" });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, Error: "Internal server error" });
    }
  }
);

router.post(
  "/",
  [
    body("text")
      .exists()
      .withMessage("Please include text")
      .bail()
      .isString()
      .withMessage("Text should be string")
      .bail()
      .trim(),
    body("amount")
      .exists()
      .withMessage("Please include amount")
      .bail()
      .isNumeric()
      .withMessage("Amount should be integer"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ errors: errors.array().map((error) => error.msg) });
    const { text, amount } = req.body;
    const transaction = Transaction.build({
      text,
      amount,
    });
    try {
      const result = await transaction.save();
      res.json({
        success: true,
        message: "Transaction created successfully",
        data: result,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, Error: "Internal server error" });
    }
  }
);

router.put(
  "/:id",
  [
    param("id")
      .exists()
      .withMessage("Please include id in param")
      .bail()
      .isUUID()
      .withMessage("id must be an UUIDV6")
      .bail()
      .trim(),
    body("text")
      .exists()
      .withMessage("Please include text")
      .bail()
      .isString()
      .withMessage("Text should be string")
      .bail()
      .trim(),
    body("amount")
      .exists()
      .withMessage("Please include amount")
      .bail()
      .isNumeric()
      .withMessage("Amount should be integer"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ errors: errors.array().map((error) => error.msg) });
    const { text, amount } = req.body;
    const transaction = {
      text,
      amount,
    };
    try {
      const result = await Transaction.update(transaction, {
        where: {
          id: req.params.id,
        },
      });
      res.json({
        success: true,
        message: "Transaction updated successfully",
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, Error: "Internal server error" });
    }
  }
);

router.delete(
  "/:id",
  param("id")
    .exists()
    .withMessage("Please include id in param")
    .bail()
    .isUUID()
    .withMessage("id must be an UUIDV6")
    .trim(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .json({ errors: errors.array().map((error) => error.msg) });
      let result = await Transaction.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (result !== null) {
        result = await Transaction.destroy({
          where: {
            id: req.params.id,
          },
        });
        return res.json({
          success: true,
          message: "Transaction deleted successfully",
        });
      } else
        return res
          .status(404)
          .json({ success: false, message: "Transaction not found" });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, Error: "Internal server error" });
    }
  }
);

module.exports = router;
