import mongoose from "mongoose";

const soilSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    soilImage: {
      url: { type: String },
      public_id: { type: String },
    },
    pH: {
      type: Number,
      required: true,
    },
    nutrients: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    fertilizers: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    pests: [
      {
        name: {
          type: String,
          required: true,
        },
        frequency: {
          type: Number,
          required: true,
        },
      },
    ],
    diseases: [
      {
        name: {
          type: String,
          required: true,
        },
        frequency: {
          type: Number,
          required: true,
        },
      },
    ],
    wateringFrequency: {
      type: String,
      enum: ["daily", "weekly", "biweekly", "monthly"],
      required: true,
    },
    lastWateredDate: {
      type: Date,
    },
    lastFertilizedDate: {
      type: Date,
    },
    lastPestControlledDate: {
      type: Date,
    },
    lastDiseaseControl: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Soil = mongoose.model("Soil", soilSchema);

export default Soil;
