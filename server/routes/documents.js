import express from "express";
import sequenceGenerator from "./sequenceGenerator.js";
import documentModel from "../models/document.js";

const seqGen = sequenceGenerator;
const docModel = documentModel;

const documentsRouter = express.Router();

// GET all documents
documentsRouter.get("/", (req, res) => {
  docModel
    .find()
    .then((documents) => {
      res
        .status(200)
        .json({ message: "Found documents", documents: documents });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem retrieving documents from the database.",
        error: err,
      });
    });
});

// POST a new document
documentsRouter.post("/", (req, res) => {
  const maxDocumentId = seqGen.nextId("documents");
  console.log("New document ID:", maxDocumentId);
  console.log("New document ID type:", typeof maxDocumentId);

  const document = new docModel({
    _id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });
  document
    .save()
    .then((createdDocument) => {
      res.status(201).json({
        message: "Document added successfully.",
        document: createdDocument,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem creating the document.",
        error: err,
      });
    });
});

// UPDATE a document
documentsRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  docModel
    .findOne({ _id: id })
    .then((document) => {
      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;

      docModel
        .updateOne({ _id: id }, document)
        .then(() => {
          res.status(200).json({
            message: "Document updated successfully.",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was an issue updating the document.",
            error: err,
          });
        });
    })

    .catch((err) => {
      res.status(404).json({
        message: "Document not found.",
        error: err,
      });
    });
});

// DELETE a document
documentsRouter.delete("/:id", (req, res) => {
  const id = req.params.id;

  docModel
    .findOne({ _id: id })
    .then((document) => {
      document
        .deleteOne({ _id: id })
        .then(() => {
          res.status(200).json({
            message: "Document deleted successfully.",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was an issue deleting the document.",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Document not found.",
        error: err,
      });
    });
});

export default documentsRouter;
