import { DatePicker, Typography } from "antd";

const { Text } = Typography;
const { RangePicker } = DatePicker;

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const CustomRangePicker = ({
  onChange,
  label,
  disabled,
  status,
  errorText,
  allowClear,
  // defaultValue,
  value,
  customFormat,
}) => {
  return (
    <>
      <Text>{label}</Text>
      <RangePicker
        onChange={onChange}
        format={customFormat || dateFormatList}
        showToday={false}
        disabled={disabled}
        status={status}
        allowClear={allowClear}
        placeholder={["Início", "Fim"]}
        style={{ marginTop: 5, width: "100%" }}
        // defaultValue={defaultValue}
        value={value}
      />
      <br />
      <Text style={{ color: "red", fontSize: 10, margin: 0, padding: 0 }}>
        {errorText}
      </Text>
    </>
  );
};

export default CustomRangePicker;
