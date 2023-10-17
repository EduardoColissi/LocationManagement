import { CalendarOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

const TableShowLocations = ({ onClick }) => {
  return (
    <Tooltip title="Visualizar Locações" placement="top">
      <Button
        type="primary"
        style={{ margin: 2, backgroundColor: "#27c55e" }}
        shape="circle"
        size="small"
        onClick={onClick}
      >
        <CalendarOutlined />
      </Button>
    </Tooltip>
  );
};

export default TableShowLocations;
