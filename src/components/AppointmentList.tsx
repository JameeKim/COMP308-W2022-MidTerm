import { useAppointmentList } from "../contexts/appointmentList";

import Appointment from "./Appointment";
import AppointmentForm from "./AppointmentForm";

export default function AppointmentList(): JSX.Element {
  const { list } = useAppointmentList();

  return (
    <table className="table table-bordered table-striped table-hover table-responsive align-middle">
      <thead className="text-center">
        <tr>
          <th scope="col">Card Number</th>
          <th scope="col">Vaccine Site</th>
          <th scope="col">Priority Area</th>
          <th scope="col">Date & Time</th>
          <th scope="col">Cancelled</th>
          <th scope="col"><span className="visually-hidden">Actions</span></th>
        </tr>
      </thead>
      <tbody>
        <AppointmentForm />
      </tbody>
      <tbody>
        {list.map((appt) => <Appointment key={appt._id} data={appt} />)}
      </tbody>
    </table>
  );
}
