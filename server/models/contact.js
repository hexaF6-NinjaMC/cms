import mongoose from "mongoose";
import { randomUUID } from "crypto";

const contactSchema = mongoose.Schema(
  {
    _id: { type: String, default: () => randomUUID(), required: true },
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    imageUrl: { type: String },
    group: [{ type: String, ref: "Contact" }],
  },
  { _id: false },
);

const contactModel =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default contactModel;
