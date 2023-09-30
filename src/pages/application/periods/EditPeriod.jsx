import { Col, Row, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { api } from "../../../services/api";

import FormButton from "../../../components/FormButton";
import FormCancelButton from "../../../components/FormCancelButton";
import FormInput from "../../../components/FormInput";
import CustomRangePicker from "../../../components/CustomRangePicker";
import Template from "../../../template/Template";
import Loading from "../../../components/Loading";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const EditPeriod = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [descriptionStatus, setDescriptionStatus] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [periodStatus, setPeriodStatus] = useState("");
  const [periodError, setPeriodError] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeriod();
  }, []);

  const getPeriod = async () => {
    try {
      const resp = await api.get(`/period/${id}`);
      console.log(resp.data);
      setDescription(resp.data.period.description);
      setStartDate(resp.data.period.start_date);
      setEndDate(resp.data.period.end_date);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description.length > 3) {
      try {
        await api.post("/period", {
          description,
          start_date: startDate,
          end_date: endDate,
          one_day: startDate === endDate ? true : false,
        });
        setDescription("");
        message.success("Período atualizado com sucesso!");
        navigate("/periods");
      } catch (error) {
        console.log(error);
      }
    } else {
      message.error("Preencha os campos obrigatórios");
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Template>
      <Row>
        <Col span={24}>
          <Title level={3}>Editar Período</Title>
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <FormInput
            placeholder="Natal, Carnaval, etc"
            label={
              <Text style={{ color: "red" }}>
                * <Text>Descrição</Text>
              </Text>
            }
            value={description}
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
              if (e.target.value.length > 3) {
                setDescriptionStatus("");
                setDescriptionError("");
              } else {
                setDescriptionStatus("error");
                setDescriptionError(
                  "A descrição deve ter no mínimo 3 caracteres."
                );
              }
            }}
            required
            status={descriptionStatus}
            errorText={descriptionError}
          />
        </Col>
        <Col>
          <CustomRangePicker
            onChange={(e) => {
              setStartDate(e[0]);
              setEndDate(e[1]);
              if (e) {
                setPeriodStatus("");
                setPeriodError("");
              } else {
                setPeriodStatus("error");
                setPeriodError("O período é obrigatório.");
              }
            }}
            label={
              <Text style={{ color: "red" }}>
                * <Text>Período</Text>
              </Text>
            }
            allowClear={true}
            value={[dayjs(startDate), dayjs(endDate)]}
            status={periodStatus}
            errorText={periodError}
          />
        </Col>
      </Row>
      <Row gutter={12} style={{ marginTop: 15 }}>
        <Col>
          <FormCancelButton
            onClick="/periods"
            tooltip="Cancelar e voltar para a listagem de períodos"
          />
        </Col>
        <Col>
          <FormButton
            text="Salvar"
            onClick={handleSubmit}
            tooltip="Salvar Período"
          />
        </Col>
      </Row>
    </Template>
  );
};

export default EditPeriod;
