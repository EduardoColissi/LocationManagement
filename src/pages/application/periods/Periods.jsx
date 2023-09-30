import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { api } from "../../../services/api";

import CreateButton from "../../../components/CreateButton";
import TableDeleteButton from "../../../components/TableDeleteButton";
import TableEditButton from "../../../components/TableEditButton";
import Template from "../../../template/Template";
import CustomTable from "../../../components/CustomTable/CustomTable";
import dayjs from "dayjs";

const { Title } = Typography;

const Periods = () => {
  const [data, setData] = useState([]);
  const [searchDescription, setSearchDescription] = useState("");

  const navigate = useNavigate();

  const columns = [
    {
      title: (
        <div style={{ textAlign: "center" }}>
          <span>ID</span>
        </div>
      ),
      key: "id",
      width: 45,
      render: (text) => (
        <div style={{ textAlign: "center" }}>
          <span>{text.id}</span>
        </div>
      ),
    },
    {
      dataIndex: "description",
      title: "Descrição",
      key: "description",
    },
    {
      title: "Data Inicial",
      key: "start_date",
      width: 150,
      render: (text) => (
        <div style={{ textAlign: "center" }}>
          <span>{dayjs(text.start_date).format("DD/MM/YYYY")}</span>
        </div>
      ),
    },
    {
      title: "Data Final",
      key: "end_date",
      width: 150,
      render: (text) => (
        <div style={{ textAlign: "center" }}>
          <span>{dayjs(text.end_date).format("DD/MM/YYYY")}</span>
        </div>
      ),
    },
    {
      title: "Ações",
      key: "action",
      width: 70,
      render: (record) => {
        return (
          <>
            <TableEditButton
              onClick={() => {
                navigate(`/period/${record.id}`);
              }}
            />
            <TableDeleteButton
              popTitle={"Deseja excluir o período " + record.description + "?"}
              placement="topRight"
              onConfirm={() => {
                handleDelete(record.id);
              }}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const info = localStorage.getItem("periodDeleteMessage");
    if (info) {
      message.success(info);
      localStorage.removeItem("periodDeleteMessage");
    }

    const infoError = localStorage.getItem("periodErrorDeleteMessage");
    if (infoError) {
      message.error(infoError);
      localStorage.removeItem("periodErrorDeleteMessage");
    }

    setData([]);

    const query = {
      searchDescription: searchDescription,
    };

    api
      .get(`/periods?${qs.stringify(query)}`)
      .then((response) => {
        setData(response.data.periods);
        response.data.periods != undefined
          ? null
          : message.info("Nenhum período encontrado.");
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [searchDescription]);

  const handleDelete = async (periodId) => {
    try {
      const response = await api.delete(`/period/${periodId}`);
      localStorage.setItem("periodDeleteMessage", response.data.message);
      location.reload(true);
    } catch (error) {
      localStorage.setItem(
        "periodErrorDeleteMessage",
        "Não foi possível deletar o período, verifique se não há lançamentos vinculados a ele."
      );
      location.reload(true);
    }
  };

  return (
    <Template>
      <Row justify="space-between">
        <Col>
          <Title level={3}>Períodos</Title>
        </Col>
        <Col>
          <CreateButton title="Adicionar Período" onClick="/period/create" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Title level={5}>Filtros</Title>
        </Col>
      </Row>
      <Row gutter={[0, 8]}>
        <Col span={8}>
          <Input
            allowClear
            suffix={<SearchOutlined />}
            placeholder="Pesquise pela descrição"
            value={searchDescription}
            onChange={(e) => {
              const currValue = e.target.value;
              setSearchDescription(currValue);
              const filteredVals = data.filter((entry) =>
                entry.description.includes(currValue)
              );
              setData(filteredVals);
            }}
          />
        </Col>
        <Col span={24}>
          <CustomTable
            columns={columns}
            data={data}
            emptyText="Nenhum período encontrado."
          />
        </Col>
      </Row>
    </Template>
  );
};

export default Periods;
