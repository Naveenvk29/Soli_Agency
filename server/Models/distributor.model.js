import mongoose from "mongoose";

const distributorSchema = new mongoose.Schema(
  {
    ProfilePic: {
      url: { type: String },
      public_id: { type: String },
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    Soils: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Soil",
      },
    ],
  },
  { timestamps: true }
);

const Distributor = mongoose.model("Distributor", distributorSchema);

export default Distributor;
