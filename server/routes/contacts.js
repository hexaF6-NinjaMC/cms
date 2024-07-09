import express from "express";
import contactModel from "../models/contact.js";

const conModel = contactModel;

const contactsRouter = express.Router();

// GET all contacts
contactsRouter.get("/", (req, res) => {
  conModel
    .find()
    .populate("group")
    .then((contacts) => {
      res.status(200).json({
        message: "Retrieved contacts from database.",
        contacts: contacts,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an issue retrieving contacts from the database.",
        error: err,
      });
    });
});

// POST a new contact
contactsRouter.post("/", (req, res) => {
  const contact = new conModel({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group,
  });
  contact
    .save()
    .then((createdContact) => {
      res.status(201).json({
        message: "Contact added successfully.",
        contact: createdContact,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem creating the contact.",
        error: err,
      });
    });
});

// UPDATE a contact
contactsRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  conModel
    .findOne({ _id: id })
    .then((contact) => {
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageUrl = req.body.imageUrl;
      contact.group = req.body.group;

      conModel
        .updateOne({ _id: id }, contact)
        .then(() => {
          res.status(200).json({
            message: "Contact updated successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was an issue updating the contact.",
            error: err,
          });
        });
    })

    .catch((err) => {
      res.status(404).json({
        message: "Contact not found.",
        error: err,
      });
    });
});

// DELETE a contact
contactsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  conModel
    .findOne({ _id: id })
    .then((contact) => {
      contact
        .deleteOne({ _id: id })
        .then(() => {
          res.status(200).json({
            message: "Contact deleted successfully.",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was an issue deleting the contact.",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Contact not found.",
        error: err,
      });
    });
});

export default contactsRouter;
