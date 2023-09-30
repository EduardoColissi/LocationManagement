import { Input, Typography } from "antd";

const { Text } = Typography;

const InputForm = ({
  placeholder,
  value,
  onChange,
  type,
  maxLength,
  label,
  disabled,
  status,
  errorText,
}) => {
  return (
    <>
      <Text>{label}</Text>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        maxLength={maxLength}
        style={{ marginTop: 5 }}
        disabled={disabled}
        status={status}
      />
      <Text style={{ color: "red", fontSize: 10, margin: 0, padding: 0 }}>
        {errorText}
      </Text>
    </>
  );
};

export default InputForm;
