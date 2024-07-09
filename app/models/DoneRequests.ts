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

const doneRequestSchema = new Schema({
    pharmacistId: {
        type: String,
        required: true,
    },
    EndDate: {
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

const DoneRequest = models.DoneRequest || mongoose.model("DoneRequest",doneRequestSchema)
export default DoneRequest;