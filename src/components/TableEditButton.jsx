import { EditOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import Theme from "../Theme";

const TableEditButton = ({ onClick }) => {
  return (
    <Tooltip title="Editar" placement="top">
      <Button
        type="primary"
        style={{ backgroundColor: Theme.colorSecondary, margin: 2 }}
        shape="circle"
        size="small"
        onClick={onClick}
      >
        <EditOutlined />
      </Button>
    </Tooltip>
  );
};

export default TableEditButton;
