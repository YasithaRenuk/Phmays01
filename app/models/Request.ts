import mongoose, { Schema, models } from "mongoose";

// Define the schema for the drugs array
const drugSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  measurement: {
    type: String,
    required: true,
  },
});

// Define the main schema
const RequiredSchema = new Schema({
  customerId: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    required: true,
  },
  drugs: {
    type: [drugSchema], // Reference the drug schema here
    required: true,
  },
  createDate: {
    type: Date,
    required: true,
  },
  pharmacistId: {
    type: String,
  },
  pharmacistEmail: {
    type: String,
  },
});

const Required = models.Required || mongoose.model("Required", RequiredSchema);
export default Required;
