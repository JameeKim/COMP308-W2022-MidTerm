import { useCallback, useState } from "react";

import type { AppointmentData, WithId } from "../../common/models";
import { del } from "../api";
import { useAppointmentList } from "../contexts/appointmentList";

export interface AppointmentProps {
  data: WithId<AppointmentData>;
}

export default function Appointment({ data }: AppointmentProps): JSX.Element {
  const { interactable, refresh } = useAppointmentList();
  const [pending, setPending] = useState(false);

  const onClick = useCallback(async () => {
    try {
      setPending(true);
      const status = await del(`/api/appointment/${data._id}`);
      if (status === 200 || status === 404) {
        refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setPending(false);
    }
  }, [data._id, refresh]);

  return (
    <tr>
      <td>{data.cardNumber}</td>
      <td>{data.vaccineSite}</td>
      <td>{data.priorityArea}</td>
      <td>{data.dateTime.toLocaleString()}</td>
      <td className={`text-center text-${data.cancelled ? "danger" : "muted"}`}>
        {data.cancelled ? "Cancelled" : "-"}
      </td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger w-100"
          disabled={!interactable || pending}
          onClick={onClick}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
