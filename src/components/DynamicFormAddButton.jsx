import { Button, Tooltip } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const DynamicFormAddButton = ({ text, onClick, tooltip, loading }) => {
  return (
    <Tooltip title={tooltip}>
      <Button
        onClick={onClick}
        type="primary"
        style={{ minWidth: 100 }}
        loading={loading}
      >
        {text} <PlusCircleOutlined />
      </Button>
    </Tooltip>
  );
};

export default DynamicFormAddButton;
