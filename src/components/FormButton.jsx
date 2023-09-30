import { SaveOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

const FormButton = ({ text, onClick, tooltip, loading }) => {
  return (
    <Tooltip title={tooltip}>
      <Button
        onClick={onClick}
        type="primary"
        style={{ minWidth: 100 }}
        loading={loading}
      >
        {text} <SaveOutlined />
      </Button>
    </Tooltip>
  );
};

export default FormButton;
