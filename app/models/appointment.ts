import { HydratedDocument, Schema, model } from "mongoose";

import type { AppointmentData, PriorityArea } from "../../common/models";

const priorityAreaEnum: PriorityArea[] = ["80+", "healthcare", "essential"];

const schema = new Schema<AppointmentData>(
  {
    cardNumber: {
      type: String,
      required: true,
    },
    vaccineSite: {
      type: String,
      required: true,
    },
    priorityArea: {
      type: String,
      enum: priorityAreaEnum,
      required: false,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    cancelled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Appointment = model("Appointment", schema);
export default Appointment;

export type AppointmentDoc = HydratedDocument<AppointmentData>;
