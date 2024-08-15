import mongoose from "mongoose";
import qrCodes from "@/app/models/DocumentsEntity";

qrCodes;
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  qrCodes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocumentsEntity",
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
