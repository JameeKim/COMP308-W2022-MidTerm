import { useCallback, useEffect, useMemo, useState } from "react";

import type { AppointmentData, WithId } from "../common/models";

import { get } from "./api";
import AppointmentList from "./components/AppointmentList";
import { AppointmentListContextData, AppointmentListProvider } from "./contexts/appointmentList";

/**
 * Main container that fetches the data
 */
export default function App(): JSX.Element {
  const [list, setList] = useState<WithId<AppointmentData>[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [unique, setUnique] = useState(() => Math.random());

  const refresh = useCallback(() => { setUnique(Math.random()); }, []);

  useEffect(() => {
    const abort = new AbortController();

    const doFetch = async (): Promise<void> => {
      setPending(true);
      try {
        const result = await get<WithId<AppointmentData>[]>("/api/appointment", abort.signal);
        if (result.status === 200) {
          setList(result.data.map(
            (appt: WithId<AppointmentData>) => ({ ...appt, dateTime: new Date(appt.dateTime) }),
          ));
          setError("");
        } else {
          setError("Failed to retrieve data");
        }
      } catch (e) {
        if (e instanceof DOMException && e.code === DOMException.ABORT_ERR) {
          console.log("request aborted");
          return;
        }
        console.error(e);
        if (e instanceof Error) {
          setError(e.message);
          return;
        }
        if (typeof e === "string") {
          setError(e);
        }
      } finally {
        setPending(false);
      }
    };

    doFetch();
    return () => abort.abort();
  }, [unique]);

  const context = useMemo<AppointmentListContextData>(() => ({
    list,
    interactable: !pending && !error,
    refresh,
  }), [error, list, pending, refresh]);

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <a href="/" className="navbar-brand">Vaccince Appointments</a>
        </div>
      </nav>

      <div className="container-lg p-3">
        <h1 className="text-center mb-3">Vaccine Appointments</h1>

        <div className="d-flex align-items-stretch mb-3">
          <button type="button" className="btn btn-outline-secondary me-4" onClick={refresh}>
            Refresh Data
          </button>
          {pending && <div className="alert alert-info fade show mb-0 py-1">Loading...</div>}
          {(!pending && error) && (
            <div className="alert alert-danger mb-0 py-1" role="alert">{error}</div>
          )}
        </div>

        <AppointmentListProvider value={context}>
          <AppointmentList />
        </AppointmentListProvider>
      </div>
    </>
  );
}
