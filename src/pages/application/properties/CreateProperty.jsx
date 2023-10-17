import { Col, Row, Typography, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../../../services/api";

import FormButton from "../../../components/FormButton";
import FormCancelButton from "../../../components/FormCancelButton";
import FormInput from "../../../components/FormInput";
import FormInputNumber from "../../../components/FormInputNumber";
import FormDivider from "../../../components/FormDivider";
import CustomSelect from "../../../components/CustomSelect";
import Template from "../../../template/Template";

const { Title, Text } = Typography;

const propertyType = [
  {
    label: "Apartamento",
    value: 1,
  },
  {
    label: "Casa",
    value: 2,
  },
];

const booleanOptions = [
  {
    label: "Sim",
    value: 1,
  },
  {
    label: "Não",
    value: 0,
  },
];

const CreateProperty = () => {
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [house, setHouse] = useState("");
  const [apartment, setApartment] = useState("");
  const [rooms, setRooms] = useState("");
  const [petFriendly, setPetFriendly] = useState("");
  const [bedLinen, setBedLinen] = useState("");
  const [towels, setTowels] = useState("");
  const [comission, setComission] = useState("");

  const [descriptionStatus, setDescriptionStatus] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [streetStatus, setStreetStatus] = useState("");
  const [streetError, setStreetError] = useState("");
  const [numberStatus, setNumberStatus] = useState("");
  const [numberError, setNumberError] = useState("");
  const [neighborhoodStatus, setNeighborhoodStatus] = useState("");
  const [neighborhoodError, setNeighborhoodError] = useState("");
  const [cityStatus, setCityStatus] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateStatus, setStateStatus] = useState("");
  const [stateError, setStateError] = useState("");
  const [propertyTypeStatus, setPropertyTypeStatus] = useState("");
  const [propertyTypeError, setPropertyTypeError] = useState("");
  const [roomsStatus, setRoomsStatus] = useState("");
  const [roomsError, setRoomsError] = useState("");
  const [petFriendlyStatus, setPetFriendlyStatus] = useState("");
  const [petFriendlyError, setPetFriendlyError] = useState("");
  const [bedLinenStatus, setBedLinenStatus] = useState("");
  const [bedLinenError, setBedLinenError] = useState("");
  const [towelsStatus, setTowelsStatus] = useState("");
  const [towelsError, setTowelsError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      (description.length > 3 &&
        city.length > 0 &&
        state.length > 0 &&
        street.length > 3 &&
        neighborhood.length > 0 &&
        number > 0 &&
        rooms > 0 &&
        petFriendly == true) ||
      (false && bedLinen == true) ||
      (false && towels == true) ||
      false
    ) {
      try {
        await api.post("/property", {
          description,
          street,
          number,
          complement,
          neighborhood,
          city,
          state,
          zip_code: zipCode,
          house,
          apartment,
          rooms,
          pet_friendly: petFriendly,
          bed_linen: bedLinen,
          towels,
          comission,
        });
        setDescription("");
        message.success("Imóvel cadastrado com sucesso!");
        navigate("/properties");
      } catch (error) {
        console.log(error);
      }
    } else {
      message.error("Preencha os campos obrigatórios");
    }
  };

  return (
    <Template>
      <Row>
        <Col span={24}>
          <Title level={3}>Cadastro de Imóvel</Title>
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <FormDivider subtitle="Dados do Imóvel" />
        </Col>
        <Col span={8}>
          <FormInput
            placeholder="Prédio vermelho, duas quadras da praia, vista para o mar, etc"
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
        <Col span={4}>
          <CustomSelect
            label={
              <Text style={{ color: "red" }}>
                * <Text>Tipo de Imóvel</Text>
              </Text>
            }
            options={propertyType}
            onChange={(e) => {
              if (e == 1) {
                setHouse(false);
                setApartment(true);
                setPropertyTypeStatus("");
                setPropertyTypeError("");
              } else if (e == 2) {
                setHouse(true);
                setApartment(false);
                setPropertyTypeStatus("");
                setPropertyTypeError("");
              } else if (e == undefined) {
                setPropertyTypeStatus("error");
                setPropertyTypeError("Tipo de imóvel é obrigatório.");
              }
            }}
            placeholder="Selecione"
            status={propertyTypeStatus}
            errorText={propertyTypeError}
            allowClear={true}
          />
        </Col>
        <Col span={2}>
          <FormInputNumber
            label={
              <Text style={{ color: "red" }}>
                * <Text>Dormitórios</Text>
              </Text>
            }
            placeholder={"2"}
            value={rooms}
            precision={0}
            onChange={(e) => {
              setRooms(e);
              if (e >= 0) {
                setRoomsStatus("");
                setRoomsError("");
              } else if (e < 0) {
                setRooms(0);
              } else {
                setRoomsStatus("error");
                setRoomsError("Número de dormitórios é obrigatório.");
              }
            }}
            required
            status={roomsStatus}
            errorText={roomsError}
          />
        </Col>
        <Col span={4}>
          <CustomSelect
            label={
              <Text style={{ color: "red" }}>
                * <Text>Aceita animais?</Text>
              </Text>
            }
            options={booleanOptions}
            onChange={(e) => {
              if (e == 1) {
                setPetFriendly(true);
                setPropertyTypeStatus("");
                setPropertyTypeError("");
              } else if (e == 0) {
                setPetFriendly(false);
                setPetFriendlyStatus("");
                setPetFriendlyError("");
              } else if (e == undefined) {
                setPetFriendlyStatus("error");
                setPetFriendlyError("Essa informação é obrigatória.");
              }
            }}
            placeholder="Selecione"
            status={petFriendlyStatus}
            errorText={petFriendlyError}
            allowClear={true}
          />
        </Col>
        <Col span={4}>
          <CustomSelect
            label={
              <Text style={{ color: "red" }}>
                * <Text>Possui roupas de cama?</Text>
              </Text>
            }
            options={booleanOptions}
            onChange={(e) => {
              if (e == 1) {
                setBedLinen(true);
                setBedLinenStatus("");
                setBedLinenError("");
              } else if (e == 0) {
                setBedLinen(false);
                setBedLinenStatus("");
                setBedLinenError("");
              } else if (e == undefined) {
                setBedLinenStatus("error");
                setBedLinenError("Essa informação é obrigatória.");
              }
            }}
            placeholder="Selecione"
            status={bedLinenStatus}
            errorText={bedLinenError}
            allowClear={true}
          />
        </Col>
        <Col span={4}>
          <CustomSelect
            label={
              <Text style={{ color: "red" }}>
                * <Text>Possui toalhas?</Text>
              </Text>
            }
            options={booleanOptions}
            onChange={(e) => {
              if (e == 1) {
                setTowels(true);
                setTowelsStatus("");
                setTowelsError("");
              } else if (e == 0) {
                setTowels(false);
                setTowelsStatus("");
                setTowelsError("");
              } else if (e == undefined) {
                setTowelsStatus("error");
                setTowelsError("Essa informação é obrigatória.");
              }
            }}
            placeholder="Selecione"
            status={towelsStatus}
            errorText={towelsError}
            allowClear={true}
          />
        </Col>
        <Col span={24}>
          <FormDivider subtitle="Endereço do Imóvel" />
        </Col>
        <Col span={8}>
          <FormInput
            label={
              <Text style={{ color: "red" }}>
                * <Text>Logradouro</Text>
              </Text>
            }
            placeholder={"Rua, Avenida, etc"}
            value={street}
            type="text"
            onChange={(e) => {
              setStreet(e.target.value);
              if (e.target.value.length > 3) {
                setStreetStatus("");
                setStreetError("");
              } else {
                setStreetStatus("error");
                setStreetError("O logradouro deve ter no mínimo 3 caracteres.");
              }
            }}
            required
            status={streetStatus}
            errorText={streetError}
          />
        </Col>
        <Col span={4}>
          <FormInputNumber
            label={
              <Text style={{ color: "red" }}>
                * <Text>Número</Text>
              </Text>
            }
            placeholder={"100"}
            value={number}
            precision={0}
            onChange={(e) => {
              setNumber(e);
              if (e >= 0) {
                setNumberStatus("");
                setNumberError("");
              } else if (e < 0) {
                setRooms(0);
              } else {
                setNumberStatus("error");
                setNumberError("Número do imóvel é obrigatório.");
              }
            }}
            required
            status={numberStatus}
            errorText={numberError}
          />
        </Col>
        <Col span={6}>
          <FormInput
            placeholder="Apto 303, Casa 2, etc"
            label="Complemento"
            value={complement}
            type="text"
            onChange={(e) => {
              setComplement(e.target.value);
            }}
            required
          />
        </Col>
        <Col span={6}>
          <FormInput
            placeholder="Centro, Beira-Mar, etc"
            label={
              <Text style={{ color: "red" }}>
                * <Text>Bairro</Text>
              </Text>
            }
            value={neighborhood}
            type="text"
            onChange={(e) => {
              setNeighborhood(e.target.value);
              if (e.target.value.length > 3) {
                setNeighborhoodStatus("");
                setNeighborhoodError("");
              } else {
                setNeighborhoodStatus("error");
                setNeighborhoodError("Bairro é obrigatório.");
              }
            }}
            required
            status={neighborhoodStatus}
            errorText={neighborhoodError}
          />
        </Col>
        <Col span={8}>
          <FormInput
            placeholder="12345-678"
            label={<Text>CEP</Text>}
            value={zipCode}
            type="text"
            onChange={(e) => {
              setZipCode(e.target.value);
            }}
            required
          />
        </Col>
        <Col span={8}>
          <FormInput
            placeholder="Florianópolis, Niterói..."
            label={
              <Text style={{ color: "red" }}>
                * <Text>Cidade</Text>
              </Text>
            }
            value={city}
            type="text"
            onChange={(e) => {
              setCity(e.target.value);
              if (e.target.value.length > 0) {
                setCityStatus("");
                setCityError("");
              } else {
                setCityStatus("error");
                setCityError("Cidade é obrigatório.");
              }
            }}
            required
            status={cityStatus}
            errorText={cityError}
          />
        </Col>
        <Col span={8}>
          <FormInput
            placeholder="Rio de Janeiro, Santa Catarina..."
            label={
              <Text style={{ color: "red" }}>
                * <Text>Estado</Text>
              </Text>
            }
            value={state}
            type="text"
            onChange={(e) => {
              setState(e.target.value);
              if (e.target.value.length > 0) {
                setStateStatus("");
                setStateError("");
              } else {
                setStateStatus("error");
                setStateError("Estado é obrigatório.");
              }
            }}
            required
            status={stateStatus}
            errorText={stateError}
          />
        </Col>
        <FormDivider subtitle="Locações" />
        <Col span={8}>
          <FormInputNumber
            label="Comissão"
            onChange={(e) => {
              setComission(e);
            }}
            placeholder={"10"}
            value={comission}
            precision={2}
            required
            addonAfter={"%"}
          />
        </Col>
      </Row>
      <Row gutter={12} style={{ marginTop: 15 }}>
        <Col>
          <FormCancelButton
            onClick="/properties"
            tooltip="Cancelar e voltar para a listagem de períodos"
          />
        </Col>
        <Col>
          <FormButton
            text="Salvar"
            onClick={handleSubmit}
            tooltip="Salvar Imóvel"
          />
        </Col>
      </Row>
    </Template>
  );
};

export default CreateProperty;
