import { useState } from "react";

import { get } from "./api";

export default function App(): JSX.Element {
  const [msg, setMsg] = useState("");

  const onClick = async (): Promise<void> => {
    const result = await get<string>("/api/hello");
    if (result.status === 200) {
      setMsg(result.data);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <a href="/" className="navbar-brand">Vaccince Appointments</a>
        </div>
      </nav>
      <div className="container-lg p-3">
        <h1>Hello</h1>
        <button className="btn btn-outline-primary" onClick={onClick}>Fetch</button>
        <p>{msg}</p>

        <table className="table table-bordered table-responsive align-middle">
          <thead>
            <tr>
              <th scope="col">Card Number</th>
              <th scope="col">Vaccine Site</th>
              <th scope="col">Priority Area</th>
              <th scope="col">Date & Time</th>
              <th scope="col">Cancelled</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}
