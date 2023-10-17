import { Col, Row, Typography, message } from "antd";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import qs from "qs";
import dayjs from "dayjs";

import { api } from "../../../services/api";
import countDays from "../../../functions/countDays";
import getPeriodDates from "../../../functions/getPeriodDates";

import FormButton from "../../../components/FormButton";
import FormCancelButton from "../../../components/FormCancelButton";
import FormInput from "../../../components/FormInput";
import CustomRangePicker from "../../../components/CustomRangePicker";
import Template from "../../../template/Template";
import FormInputNumber from "../../../components/FormInputNumber";
import FormDivider from "../../../components/FormDivider";
import CustomSelect from "../../../components/CustomSelect";
import DynamicFormAddButton from "../../../components/DynamicFormAddButton";
import DynamicFormDeleteButton from "../../../components/DynamicFormDeleteButton";
import Loading from "../../../components/Loading";

const { Title, Text } = Typography;

const CreateLocation = () => {
  const [periods, setPeriods] = useState([]);
  const [periodsOptions, setPeriodsOptions] = useState([]);

  const [renter, setRenter] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [price_per_day, setPrice_per_day] = useState(0);
  const [descount, setDescount] = useState(0);
  const [additional_cost, setAdditional_cost] = useState(0);
  const [observations, setObservations] = useState("");
  const [total, setTotal] = useState("");
  const [prices, setPrices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [periodStatus, setPeriodStatus] = useState("");
  const [periodError, setPeriodError] = useState("");
  const [price_per_dayStatus, setPrice_per_dayStatus] = useState("");
  const [price_per_dayError, setPrice_per_dayError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const daily = countDays(
      dayjs(start_date).format("DD/MM/YYYY"),
      dayjs(end_date).format("DD/MM/YYYY")
    );

    console.log("teste");

    if (prices.length > 0) {
      let totalPrices = 0;
      let locationDates = getPeriodDates(
        dayjs(start_date).format("DD/MM/YYYY"),
        dayjs(end_date).format("DD/MM/YYYY")
      );
      let specialPrice = 0;
      let regularDayCount = daily;

      for (let i = 0; i < prices.length; i++) {
        const matchingPeriod = periods.find(
          (p) => p.id === prices[i].period_id
        );

        if (matchingPeriod) {
          const specialDates = getPeriodDates(
            dayjs(matchingPeriod.start_date).format("DD/MM/YYYY"),
            dayjs(matchingPeriod.end_date).format("DD/MM/YYYY")
          );

          const matchingDatesCount =
            specialDates.filter((date) => locationDates.includes(date)).length -
            1;

          specialPrice += matchingDatesCount * prices[i].price;

          regularDayCount -= matchingDatesCount;
        }
      }

      totalPrices =
        regularDayCount * price_per_day +
        additional_cost +
        specialPrice -
        (regularDayCount * price_per_day + additional_cost + specialPrice) *
          (descount / 100);

      setTotal(totalPrices);
    } else {
      console.log("teste2");
      setTotal(
        daily * price_per_day +
          additional_cost -
          (daily * price_per_day + additional_cost) * (descount / 100)
      );
      console.log(total);
    }
  }, [prices, price_per_day, descount, additional_cost, start_date, end_date]);

  useEffect(() => {
    getPeriods();
  }, []);

  const getPeriods = async () => {
    try {
      const query = {
        searchDescription: "",
      };
      const response = await api.get(`/periods?${qs.stringify(query)}`);
      const options = [];
      for (let i = 0; i < response.data.periods.length; i++) {
        options.push({
          label: `${response.data.periods[i].description}`,
          value: response.data.periods[i].id,
        });
      }
      setPeriods(response.data.periods);
      setPeriodsOptions(options);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addPrices = () => {
    setPrices([...prices, {}]);
  };

  const removePrices = (index) => {
    const newPrices = [...prices];
    newPrices.splice(index, 1);
    setPrices(newPrices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (start_date && end_date && price_per_day >= 0) {
      try {
        const response = await api.post(`/location`, {
          renter,
          start_date,
          end_date,
          price_per_day,
          descount,
          additional_cost,
          observations,
          total,
          prices,
          property_id: id,
        });
        message.success(response.data.message);
        navigate(`/properties`);
      } catch (error) {
        console.log(error);
      }
    } else {
      message.error("Preencha os campos obrigatórios.");
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Template>
      <Row>
        <Col span={24}>
          <Title level={3}>Locar imóvel {id}</Title>
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <FormDivider subtitle="Locação" />
        <Col span={6}>
          <FormInput
            label="Locatário"
            onChange={(e) => {
              setRenter(e.target.value);
            }}
            placeholder={"Fulano da Silva"}
            value={renter}
            required
          />
        </Col>
        <FormDivider subtitle="Período" />
        <Col span={8}>
          <CustomRangePicker
            onChange={(e) => {
              setStart_date(e[0]);
              setEnd_date(e[1]);
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
                * <Text>Período da locação</Text>
              </Text>
            }
            allowClear={true}
            status={periodStatus}
            errorText={periodError}
            customFormat={["DD/MM/YYYY"]}
          />
        </Col>
        <FormDivider subtitle="Períodos especiais" />
        {prices.map((price, index) => (
          <div key={index}>
            <Title level={5}>{index + 1}º Período especial </Title>
            <Row style={{ marginBottom: 8 }} gutter={[12, 12]}>
              <Col span={6}>
                <CustomSelect
                  search={true}
                  label={<Text>Período</Text>}
                  options={periodsOptions}
                  onChange={(e) => {
                    const newPrices = [...prices];
                    newPrices[index].period_id = e;
                    setPrices(newPrices);
                  }}
                  placeholder={"Selecione o período"}
                  allowClear={true}
                />
              </Col>
              <Col span={6}>
                <FormInputNumber
                  label={
                    <Text style={{ color: "red" }}>
                      * <Text>Valor da diária do período especial</Text>
                    </Text>
                  }
                  onChange={(e) => {
                    const newPrices = [...prices];
                    newPrices[index].price = e;
                    setPrices(newPrices);
                  }}
                  placeholder={"100.00"}
                  value={price.price}
                  precision={2}
                  required
                  addonBefore={"R$"}
                />
              </Col>
              <Col span={2}>
                <DynamicFormDeleteButton
                  onClick={() => removePrices(index)}
                  tooltip="Clique para remover esse período especial"
                />
              </Col>
            </Row>
          </div>
        ))}
        <DynamicFormAddButton
          onClick={addPrices}
          text="Adicionar Período"
          tooltip="Clique para adicionar mais um período especial"
        />
        <FormDivider subtitle="Valores" />
        <Col span={4}>
          <FormInputNumber
            label={
              <Text style={{ color: "red" }}>
                * <Text>Valor da diária</Text>
              </Text>
            }
            onChange={(e) => {
              setPrice_per_day(e);
              if (e >= 0) {
                setPrice_per_dayStatus("");
                setPrice_per_dayError("");
              } else if (e < 0) {
                setPrice_per_day(0);
              } else {
                setPrice_per_dayStatus("error");
                setPrice_per_dayError("Valor da diária é obrigatório.");
              }
            }}
            placeholder={"100.00"}
            value={price_per_day}
            precision={2}
            required
            status={price_per_dayStatus}
            errorText={price_per_dayError}
            addonBefore={"R$"}
          />
        </Col>
        <Col span={4}>
          <FormInputNumber
            label="Desconto"
            onChange={(e) => {
              setDescount(e);
            }}
            placeholder={"10"}
            value={descount}
            precision={2}
            required
            addonAfter={"%"}
          />
        </Col>
        <Col span={4}>
          <FormInputNumber
            label="Custo adicional"
            onChange={(e) => {
              setAdditional_cost(e);
            }}
            placeholder={"100.00"}
            value={additional_cost}
            precision={2}
            required
            addonBefore={"R$"}
          />
        </Col>
        <Col span={12}>
          <FormInput
            label="Observações"
            onChange={(e) => {
              setObservations(e.target.value);
            }}
            placeholder={"Louça quebrada, objetos danificados, etc."}
            value={observations}
            required
          />
        </Col>
        <Col span={4}>
          <FormInputNumber
            label="Total"
            placeholder={"0.00"}
            value={total}
            precision={2}
            required
            addonBefore={"R$"}
            disabled={true}
          />
        </Col>
      </Row>
      <Row gutter={12} style={{ marginTop: 15 }}>
        <Col>
          <FormCancelButton
            onClick="/locations"
            tooltip="Cancelar e voltar para a listagem de imóveis"
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

export default CreateLocation;
