import { Input, Typography } from "antd";

const { Text } = Typography;

const AuthInput = ({
  placeholder,
  value,
  onChange,
  type,
  maxLength,
  label,
  icon,
  passwordField,
  name,
}) => {
  if (passwordField == true) {
    return (
      <>
        <Text>{label}</Text>
        <Input.Password
          name={name}
          prefix={icon}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
          maxLength={maxLength}
          style={{ marginTop: 5 }}
        />
      </>
    );
  } else {
    return (
      <>
        <Text>{label}</Text>
        <Input
          name={name}
          prefix={icon}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
          maxLength={maxLength}
          style={{ marginTop: 5 }}
        />
      </>
    );
  }
};

export default AuthInput;
