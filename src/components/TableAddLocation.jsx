import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

const TableAddLocation = ({ onClick }) => {
  return (
    <Tooltip title="Adicionar Locação" placement="top">
      <Button
        type="primary"
        style={{ margin: 2, backgroundColor: "#4378cd" }}
        shape="circle"
        size="small"
        onClick={onClick}
      >
        <PlusCircleOutlined />
      </Button>
    </Tooltip>
  );
};

export default TableAddLocation;
