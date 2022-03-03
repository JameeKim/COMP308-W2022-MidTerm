export type PriorityArea = "80+" | "healthcare" | "essential";

export interface AppointmentData {
  cardNumber: string;
  vaccineSite: string;
  priorityArea: PriorityArea;
  dateTime: Date;
  cancelled: boolean;
}

export type WithId<T, ID = string> = T & { _id: ID };
