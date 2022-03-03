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
    <div>
      <h1>Hello</h1>
      <button className="btn btn-outline-primary" onClick={onClick}>Fetch</button>
      <p>{msg}</p>
    </div>
  );
}
