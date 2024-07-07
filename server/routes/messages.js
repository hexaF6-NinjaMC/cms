import express from "express";
import sequenceGenerator from "./sequenceGenerator.js";
import messageModel from "../models/message.js";

const seqGen = sequenceGenerator;
const msgModel = messageModel;

const messagesRouter = express.Router();

// GET all messages
messagesRouter.get("/", (req, res) => {
  msgModel
    .find()
    .then((msgs) => {
      res.status(200).json({
        message: "Retrieved messages from database.",
        messageObjs: msgs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an issue retrieving messages from the database.",
        error: err,
      });
    });
});

// POST a new message
messagesRouter.post("/", (req, res) => {
  const maxMessageId = seqGen.nextId("messages");

  const msg = new msgModel({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender,
  });
  msg
    .save()
    .then((createdMsg) => {
      res.status(201).json({
        message: "Message added successfully.",
        messageObj: createdMsg,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an issue creating the message.",
        error: err,
      });
    });
});

/**
 * As the Angular application doesn't support
 * message updates or deletions, it is deemed
 * unnecessary to provide PUT and DELETE requests.
 */

export default messagesRouter;
