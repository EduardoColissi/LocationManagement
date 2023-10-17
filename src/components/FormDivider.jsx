import { Divider } from "antd";

const FormDivider = ({ subtitle }) => {
  return (
    <Divider
      orientation="left"
      style={{ borderColor: "#ccc", marginTop: 20, marginBottom: 20 }}
    >
      {subtitle}
    </Divider>
  );
};

export default FormDivider;
