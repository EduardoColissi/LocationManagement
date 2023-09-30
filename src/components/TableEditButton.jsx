import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Theme from "../Theme";

const TableEditButton = ({ onClick }) => {
  return (
    <Button
      type="primary"
      style={{ backgroundColor: Theme.colorSecondary, margin: 2 }}
      shape="circle"
      size="small"
      onClick={onClick}
    >
      <EditOutlined />
    </Button>
  );
};

export default TableEditButton;
