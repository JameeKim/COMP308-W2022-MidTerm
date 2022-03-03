import type { AppointmentData, WithId } from "../../common/models";
import Appointment from "../models/appointment";

/**
 * Get the list of all appointments and pick only the needed data
 */
export const getAll = async (): Promise<WithId<AppointmentData>[]> => {
  const res = await Appointment.find();
  return res.map((doc) => {
    const { _id, cardNumber, vaccineSite, priorityArea, dateTime, cancelled } = doc.toJSON();
    return { _id: _id.toString(), cardNumber, vaccineSite, priorityArea, dateTime, cancelled };
  });
};
