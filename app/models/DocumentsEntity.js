const mongoose = require("mongoose");

// Define the schema
const DocumentsEntitySchema = new mongoose.Schema(
  {
    barcode: {
      type: String,
      required: true,
    },
    counter: {
      type: Number,
      default: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      ref: "userEntity",
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    redeemed: {
      type: Boolean,
      default: false,
    },
    _class: {
      type: String,
      default: "com.pbd.models.DocumentsEntity",
    },
  },
  {
    collection: "DocumentsEntity",
  }
);

const DocumentsEntity =
  mongoose.models.DocumentsEntity ||
  mongoose.model("DocumentsEntity", DocumentsEntitySchema);

// Export the model
module.exports = DocumentsEntity;
