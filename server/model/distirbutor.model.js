import mongoose from "mongoose";

const distributorSchema =
  ({
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    soil: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Soil",
      },
    ],
    profilePic: {
      url: { type: String }, // URL of the movie poster
      public_id: { type: String },
    },
  },
  { timestamp: true });

const Distributor = mongoose.model("Distributor", distributorSchema);

export default Distributor;