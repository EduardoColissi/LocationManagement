import { Row, Select, Typography } from "antd";

const CustomSelect = ({
  label,
  onChange,
  defaultValue,
  value,
  options,
  placeholder,
  allowClear,
  status,
  errorText,
  search,
  disabled,
}) => {
  const { Text } = Typography;
  return (
    <>
      <Row>
        <Text>{label}</Text>
      </Row>
      <Row>
        <Select
          showSearch={search}
          filterOption={(input, option) =>
            (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
          }
          defaultValue={defaultValue}
          style={{
            width: 800,
            marginTop: 5,
            marginLeft: 0,
            paddingLeft: 0,
          }}
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          allowClear={allowClear}
          status={status}
          value={value}
          disabled={disabled}
        />
      </Row>
      <Row>
        <Text style={{ color: "red", fontSize: 10, margin: 0, padding: 0 }}>
          {errorText}
        </Text>
      </Row>
    </>
  );
};

export default CustomSelect;
