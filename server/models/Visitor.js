import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  flat: { type: String, required: true },
  purpose: { type: String, required: true },
  timeIn: { type: Date, default: Date.now },
  timeOut: { type: Date }, // optional, for marking exit
});

export default mongoose.model("Visitor", visitorSchema);
