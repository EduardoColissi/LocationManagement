import { Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const DynamicFormDeleteButton = ({ onClick, tooltip, loading }) => {
  return (
    <Tooltip title={tooltip}>
      <Button
        onClick={onClick}
        type="primary"
        style={{ minWidth: 33, marginTop: 25 }}
        danger
        loading={loading}
        shape="circle"
      >
        <DeleteOutlined />
      </Button>
    </Tooltip>
  );
};

export default DynamicFormDeleteButton;
