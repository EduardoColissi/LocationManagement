import { PlusOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

const CreateButton = ({ title, onClick }) => {
  const navigate = useNavigate();

  return (
    <Tooltip title={title}>
      <Button type="primary" onClick={() => navigate(onClick)}>
        <PlusOutlined />
        Adicionar
      </Button>
    </Tooltip>
  );
};

export default CreateButton;
