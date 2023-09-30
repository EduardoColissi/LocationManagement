import { EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";

const TableViewButton = ({ onClick }) => {
  return (
    <Button
      type="primary"
      style={{ margin: 2 }}
      shape="circle"
      size="small"
      onClick={onClick}
    >
      <EyeOutlined />
    </Button>
  );
};

export default TableViewButton;
