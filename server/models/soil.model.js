import mongoose from "mongoose";

const soilSchema = new mongoose.Schema(
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
    pests: {
      type: Array,
      required: true,
    },
    diseases: {
      type: Array,
      required: true,
    },
    soilImage: {
      url: { type: String },
      public_id: { type: String },
    },
  },
  { timestamps: true }
);

const Soil = mongoose.model("Soil", soilSchema);
export default Soil;
