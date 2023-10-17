import { SearchOutlined } from "@ant-design/icons";
import {
  Col,
  Input,
  Row,
  Typography,
  message,
  Modal,
  Calendar,
  ConfigProvider,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import ptBR from "antd/lib/locale/pt_BR";

import getPeriodDates from "../../../functions/getPeriodDates";
import { api } from "../../../services/api";
import Loading from "../../../components/Loading";

import CreateButton from "../../../components/CreateButton";
import TableDeleteButton from "../../../components/TableDeleteButton";
import TableEditButton from "../../../components/TableEditButton";
import Template from "../../../template/Template";
import CustomTable from "../../../components/CustomTable/CustomTable";
import TableAddLocation from "../../../components/TableAddLocation";
import TableShowLocations from "../../../components/TableShowLocations";
import dayjs from "dayjs";

const { Title } = Typography;

const Properties = () => {
  const [data, setData] = useState([]);
  const [searchDescription, setSearchDescription] = useState("");
  const [locations, setLocations] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [loadingCalendar, setLoadingCalendar] = useState(true);

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
      title: "Logradouro",
      key: "street",
      dataIndex: "street",
    },
    {
      title: "Nº",
      key: "number",
      dataIndex: "number",
    },
    {
      title: "Bairro",
      key: "neighborhood",
      dataIndex: "neighborhood",
    },
    {
      title: "Cidade",
      key: "city",
      dataIndex: "city",
    },
    {
      title: "Comissão",
      key: "comission",
      render: (text) => <span>{text.comission + "%"}</span>,
    },
    {
      title: "Ações",
      key: "action",
      width: 123,
      render: (record) => {
        return (
          <>
            <TableAddLocation
              onClick={() => {
                navigate(`/property/${record.id}/location/create`);
              }}
            />
            <TableShowLocations
              onClick={() => {
                showModal(record.id);
              }}
            />
            <TableEditButton
              onClick={() => {
                navigate(`/property/${record.id}`);
              }}
            />
            <TableDeleteButton
              popTitle={"Deseja excluir o imóvel " + record.id + "?"}
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

  const showModal = async (propertyId) => {
    setLoadingCalendar(true);
    try {
      const response = await api.get(`/locations/${propertyId}`);
      setLocations(response.data.locations);
      setLoadingCalendar(false);
      setModalVisible(true);
    } catch (error) {
      setLoadingCalendar(false);
      message.error("Não foi possível carregar as locações.");
    }
  };

  const closeModal = () => {
    setLocations([]);
    setModalVisible(false);
  };

  useEffect(() => {
    const info = localStorage.getItem("propertyDeleteMessage");
    if (info) {
      message.success(info);
      localStorage.removeItem("propertyDeleteMessage");
    }

    const infoError = localStorage.getItem("propertyErrorDeleteMessage");
    if (infoError) {
      message.error(infoError);
      localStorage.removeItem("propertyErrorDeleteMessage");
    }

    setData([]);

    const query = {
      searchDescription: searchDescription,
    };

    api
      .get(`/properties?${qs.stringify(query)}`)
      .then((response) => {
        setData(response.data.properties);
        response.data.properties != undefined
          ? null
          : message.info("Nenhum imóvel encontrado.");
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [searchDescription]);

  const handleDelete = async (propertyId) => {
    try {
      const response = await api.delete(`/property/${propertyId}`);
      localStorage.setItem("propertyDeleteMessage", response.data.message);
      location.reload(true);
    } catch (error) {
      localStorage.setItem(
        "propertyErrorDeleteMessage",
        "Não foi possível deletar o imóvel, verifique se não há lançamentos vinculados a ele."
      );
      location.reload(true);
    }
  };

  const handleDeleteLocation = async (locationId) => {
    try {
      await api.delete(`/location/${locationId}`);
      location.reload(true);
    } catch (error) {
      location.reload(true);
    }
  };

  function generateRentalDates(rentals) {
    let rentalDates = [];

    rentals.forEach((rental) => {
      const periodDates = getPeriodDates(
        dayjs(rental.start_date).format("DD/MM/YYYY"),
        dayjs(rental.end_date).format("DD/MM/YYYY")
      );
      periodDates.forEach((date) => {
        rentalDates.push({
          date: date,
          rental: rental,
        });
      });
    });

    return rentalDates;
  }

  const rentalDates = generateRentalDates(locations);

  const renderDateCell = (date) => {
    const format = "DD/MM/YYYY";
    const currentDate = date.format(format);

    const rentalInfo = rentalDates.find(
      (rentalDate) => rentalDate.date === currentDate
    );

    if (rentalInfo) {
      return (
        <div style={{ textAlign: "center" }}>
          <p>{rentalInfo.rental.renter}</p>
          <TableDeleteButton
            popTitle={
              "Deseja excluir a locação de " + rentalInfo.rental.renter + "?"
            }
            placement="topRight"
            onConfirm={() => {
              handleDeleteLocation(rentalInfo.rental.id);
            }}
          />
          {/* <TableEditButton
            onClick={() => {
              navigate(`/location/${rentalInfo.rental.id}`);
            }}
          /> */}
        </div>
      );
    }
    return null;
  };

  return (
    <Template>
      <Modal
        title="Locações"
        open={modalVisible}
        onCancel={closeModal}
        width={1300}
        footer={null}
      >
        {loadingCalendar ? (
          <Loading />
        ) : (
          <ConfigProvider locale={ptBR}>
            <Calendar cellRender={renderDateCell} />
          </ConfigProvider>
        )}
      </Modal>
      <Row justify="space-between">
        <Col>
          <Title level={3}>Imóveis</Title>
        </Col>
        <Col>
          <CreateButton title="Adicionar Imóvel" onClick="/property/create" />
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
            emptyText="Nenhum imóvel encontrado."
          />
        </Col>
      </Row>
    </Template>
  );
};

export default Properties;
