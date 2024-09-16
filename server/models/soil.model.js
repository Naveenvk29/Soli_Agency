import mongoose from "mongoose";

const soilSchema = new mongoose.Schema(
  {
    soilname: {
      type: String,
      required: true,
    },
    soiltype: {
      type: String,
      required: true,
    },
    soiltexture: {
      type: String,
      required: true,
    },
  },
  { timeseries: true }
);

const Soil = mongoose.model("Soil", soilSchema);

export default Soil;
