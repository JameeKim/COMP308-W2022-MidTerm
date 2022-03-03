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

/**
 * Save an appointment
 *
 * Returns any message if input is invalid
 */
export const addOne = async (input: unknown): Promise<string | null> => {
  try {
    const appt = new Appointment(input);
    await appt.save();
    return null;
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return `${e.name}: ${e.message}`;
    } else {
      return "Unknown error occurred";
    }
  }
};

/**
 * Delete an appointment
 *
 * Returns if the one with the id actually existed
 */
export const deleteOne = async (id: string): Promise<boolean> => {
  const res = await Appointment.deleteOne({ _id: id });
  return res.deletedCount > 0;
};
