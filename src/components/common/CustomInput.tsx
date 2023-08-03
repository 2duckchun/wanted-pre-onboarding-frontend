import styles from "./CustomInput.module.css";

type inputProps = {
  labelFor: string;
  labelText: string;
  id: string;
  name: string;
  type: string;
  value: string;
  testid: string;
  onChangeHandler: (params?: any) => void;
};

export default function CustomInput({
  labelFor,
  labelText,
  id,
  name,
  type,
  value,
  testid,
  onChangeHandler,
}: inputProps) {
  return (
    <div className={styles.custom_input_container}>
      <label htmlFor={labelFor} className={styles.input_label}>
        {labelText}
      </label>
      <input
        className={styles.input}
        id={id}
        name={name}
        type={type}
        value={value}
        data-testid={testid}
        onChange={onChangeHandler}
      />
    </div>
  );
}
