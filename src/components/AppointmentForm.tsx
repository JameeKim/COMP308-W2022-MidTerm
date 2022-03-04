import { FormEventHandler, useCallback, useState } from "react";

import { post } from "../api";
import { useAppointmentList } from "../contexts/appointmentList";

import CancelledCheckbox from "./CancelledCheckbox";

export default function AppointmentForm(): JSX.Element {
  const { refresh } = useAppointmentList();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    async (ev) => {
      ev.preventDefault();

      const form = ev.target as HTMLFormElement;
      const formData = new FormData(form);
      const input = {
        cardNumber: formData.get("cardNumber"),
        vaccineSite: formData.get("vaccineSite"),
        priorityArea: formData.get("priorityArea") || undefined,
        dateTime: formData.get("dateTime"),
        cancelled: !!formData.get("cancelled"),
      };

      try {
        setPending(true);
        const result = await post("/api/appointment", input);
        if (result.status === 201) {
          setError("");
          form.reset();
          refresh();
        } else if (result.status === 400 && result.error === "bad_data") {
          setError(result.message);
        } else {
          setError(`Server response status ${result.status}`);
        }
      } catch (e) {
        console.error(e);
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Unknown error occurred");
        }
      } finally {
        setPending(false);
      }
    },
    [refresh],
  );

  const formId = "add-appt-form";

  return (
    <>
      <tr>
        <td>
          <div className="form-floating">
            <input
              type="text"
              name="cardNumber"
              id="add-appt-card-number"
              form={formId}
              className="form-control"
              placeholder="Card Number"
              disabled={pending}
              required
            />
            <label htmlFor="add-appt-card-number">Card Number</label>
          </div>
        </td>
        <td>
          <div className="form-floating">
            <input
              type="text"
              name="vaccineSite"
              id="add-appt-site"
              form={formId}
              className="form-control"
              placeholder="Vaccine Site"
              disabled={pending}
              required
            />
            <label htmlFor="add-appt-site">Vaccine Site</label>
          </div>
        </td>
        <td>
          <div className="form-floating">
            <select
              name="priorityArea"
              id="add-appt-priority"
              form={formId}
              className="form-control"
              disabled={pending}
              defaultValue=""
            >
              <option value="">None</option>
              <option value="80+">80+</option>
              <option value="healthcare">Healthcare</option>
              <option value="essential">Essential</option>
            </select>
            <label htmlFor="add-appt-priority">Priority Area</label>
          </div>
        </td>
        <td>
          <div className="form-floating">
            <input
              type="text"
              name="dateTime"
              id="add-appt-datetime"
              form={formId}
              className="form-control"
              placeholder="Date & Time"
              disabled={pending}
              required
            />
            <label htmlFor="add-appt-datetime">Date & Time</label>
          </div>
        </td>
        <td className="text-center">
          <CancelledCheckbox
            name="cancelled"
            id="add-appt-cancelled"
            form={formId}
            disabled={pending}
          />
        </td>
        <td>
          <form id={formId} action="/api/appointment" method="POST" onSubmit={onSubmit}>
            <button type="submit" className="btn btn-success w-100" disabled={pending}>Add</button>
          </form>
        </td>
      </tr>
      <tr className={error ? "" : "d-none"}>
        <td colSpan={6}>
          <div className="alert alert-danger mb-0" role="alert">{error}</div>
        </td>
      </tr>
    </>
  );
}
