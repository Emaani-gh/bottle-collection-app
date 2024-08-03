import mongoose from "mongoose";

const QrCodeSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.QrCode || mongoose.model("QrCode", QrCodeSchema);
