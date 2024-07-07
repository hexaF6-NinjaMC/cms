import mongoose from "mongoose";
import { randomUUID } from "crypto";

const messageSchema = mongoose.Schema(
  {
    _id: { type: String, default: () => randomUUID(), required: true },
    subject: { type: String },
    msgText: { type: String, required: true },
    sender: { type: String, ref: "Contact" },
  },
  { _id: false },
);

const messageModel =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default messageModel;
