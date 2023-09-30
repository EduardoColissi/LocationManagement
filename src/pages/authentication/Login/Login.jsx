import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Row, Col, Typography } from "antd";
import { useContext, useEffect, useState } from "react";

// import { Theme } from "../../../globalStyles";
import { LeftDiv, RightDiv, CenteredDiv } from "./styles";
import BackgroundImage from "../../../assets/bg_auth.jpeg";
import AuthInput from "../../../components/AuthInput";
import { AuthContext } from "../../../contexts/auth";

const Login = () => {
  const { Text } = Typography;

  const { loginAuth, logoutAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await loginAuth(email, password);
    setLoading(false);
  };

  useEffect(() => {
    logoutAuth();
  }, []);

  return (
    <>
      <LeftDiv>
        <CenteredDiv>
          <Row gutter={[16, 12]}>
            <Col span={24}>
              <h1>Entre em sua conta</h1>
            </Col>
            <Col span={24}>
              <AuthInput
                name={"email"}
                icon={<MailOutlined />}
                label="E-mail"
                placeholder={"exemplo@gmail.com"}
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Col>
            <Col span={24}>
              <AuthInput
                name={"senha"}
                icon={<LockOutlined />}
                passwordField={true}
                label="Senha"
                placeholder={"Sua senha"}
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Col>
            <Col span={8}>
              <Button
                onClick={handleSubmit}
                type="primary"
                //style={{ backgroundColor: Theme.ButtonColor, minWidth: 100 }}
                loading={loading}
              >
                Entrar
              </Button>
            </Col>
            <Col span={24}>
              <Text>
                Não possui conta? <a href="/signup">Cadastre-se agora</a>
              </Text>
            </Col>
          </Row>
        </CenteredDiv>
      </LeftDiv>
      <RightDiv>
        <img src={BackgroundImage} alt="bg" />
      </RightDiv>
    </>
  );
};

export default Login;
