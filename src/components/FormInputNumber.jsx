import { InputNumber, Typography } from "antd";

const { Text } = Typography;

const FormInputNumber = ({
  placeholder,
  value,
  onChange,
  maxLength,
  label,
  disabled,
  precision,
  max,
  addonAfter,
  addonBefore,
  status,
  errorText,
}) => {
  return (
    <>
      <Text>{label}</Text>
      <InputNumber
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ marginTop: 5, width: "100%" }}
        precision={precision}
        maxLength={maxLength}
        max={max}   
        min={0}
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        disabled={disabled}
        status={status}
      />
      <Text style={{ color: "red", fontSize: 10, margin: 0, padding: 0 }}>
        {errorText}
      </Text>
    </>
  );
};

export default FormInputNumber;
