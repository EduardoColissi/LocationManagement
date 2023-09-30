import { CloseOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

const FormCancelButton = ({ tooltip, onClick }) => {
  const navigate = useNavigate();
  return (
    <Tooltip title={tooltip}>
      <Button
        onClick={() => navigate(onClick)}
        type="primary"
        style={{ minWidth: 100 }}
        danger
      >
        Cancelar <CloseOutlined />
      </Button>
    </Tooltip>
  );
};

export default FormCancelButton;
