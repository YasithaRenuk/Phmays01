import mongoose, { Schema, models } from "mongoose";

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

const approvedRequestSchema = new Schema({
    RequestId: {
        type: String,
        required: true,
    },
    pharmacistId: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        required: true,
    },
    coustomerEmail: {
        type: String,
        required: true,
    },
    drugs: {
        type: [drugSchema], // Reference the drug schema here
        required: true,
    },
})

const ApprovedRequest = models.ApprovedRequest || mongoose.model("ApprovedRequest",approvedRequestSchema)
export default ApprovedRequest;