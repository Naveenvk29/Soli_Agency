import mongoose from "mongoose";

const SoilSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    nutrients: {
      type: Object,
      required: true,
    },
    fertility: {
      type: Object,
      required: true,
    },
    texture: {
      type: String,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    pH: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    moisture: {
      type: Number,
      required: true,
    },
    distirbutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Distributors",
    },
    SoilPic: {
      url: { type: String }, // URL of the movie poster
      public_id: { type: String },
    },
  },
  { timestamps: true }
);

const Soil = mongoose.model("Soil", SoilSchema);

export default Soil;
