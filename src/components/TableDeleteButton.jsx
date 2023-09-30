import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

const TableDeleteButton = ({ popTitle, onConfirm, placement }) => {
  return (
    <Popconfirm
      title={popTitle}
      placement={placement}
      onConfirm={onConfirm}
      okText="Excluir"
      cancelText="Cancelar"
      okType="danger"
      icon={<DeleteOutlined />}
    >
      <Button
        type="primary"
        danger
        style={{ margin: 2 }}
        shape="circle"
        size="small"
      >
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};

export default TableDeleteButton;
