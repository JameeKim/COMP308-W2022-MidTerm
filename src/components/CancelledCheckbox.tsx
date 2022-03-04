import { useRef, useState } from "react";

export interface CancelledCheckboxProps {
  name: string;
  id: string;
  form?: string;
  disabled?: boolean;
  defaultValue?: boolean;
}

export default function CancelledCheckbox(
  { name, id, form, disabled, defaultValue }: CancelledCheckboxProps,
): JSX.Element {
  const [label, setLabel] = useState("Cancel");
  const ref = useRef<HTMLInputElement>(null);

  const onChange = (): void => setLabel(ref.current?.checked ? "Cancelled" : "Cancel");
  const onReset = (): void => setLabel("Cancel");

  return (
    <div>
      <input
        ref={ref}
        type="checkbox"
        name={name}
        id={id}
        form={form}
        className="btn-check"
        autoComplete="off"
        defaultChecked={defaultValue}
        disabled={disabled}
        onChange={onChange}
        onResetCapture={onReset}
      />
      <label htmlFor={id} className="btn btn-outline-danger" style={{ width: "6rem" }}>
        {label}
      </label>
    </div>
  );
}
