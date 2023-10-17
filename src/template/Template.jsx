import {
  ArrowLeftOutlined,
  HeartFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Layout, Menu, Space } from "antd";
import { useContext, useState } from "react";
import { BsCalendarRange, BsHouses } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import Theme from "../Theme";
import "./style.css";

const { Header, Sider, Content, Footer } = Layout;

const Template = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const backToLastPage = useNavigate(-1);
  const { logoutAuth } = useContext(AuthContext);

  const items = [
    {
      key: "1",
      label: "Logout",
      onClick: () => {
        logoutAuth();
      },
      icon: <PoweroffOutlined />,
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
        maxHeight: "100vh",
        minWidth: "100vw",
        maxWidth: "100vw",
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={190}
        style={{
          backgroundColor: Theme.colorPrimaryDark,
          height: "auto",
        }}
      >
        {collapsed ? (
          <Space className="trigger">
            <MenuUnfoldOutlined
              className="trigger"
              onClick={() => setCollapsed(!collapsed)}
              style={{
                color: Theme.colorPrimaryLight,
                marginBottom: 0,
                padingBottom: 0,
                marginLeft: 5,
              }}
            />
          </Space>
        ) : (
          <Space className="trigger">
            <MenuFoldOutlined
              className="trigger"
              onClick={() => setCollapsed(!collapsed)}
              style={{
                color: Theme.colorPrimaryLight,
                marginBottom: 0,
                padingBottom: 0,
                marginLeft: 5,
              }}
            />
          </Space>
        )}
        <div className="logo">{collapsed ? null : null}</div>
        <Menu
          theme="dark"
          mode="inline"
          style={{
            backgroundColor: Theme.colorPrimaryDark,
            color: Theme.colorPrimaryLight,
            height: "auto",
          }}
        >
          <Menu.Item key="1" icon={<BsCalendarRange />}>
            <Link to="/periods">Períodos</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BsHouses />}>
            <Link to="/properties">Imóveis</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: Theme.colorPrimaryDark,
          }}
        >
          <Space className="trigger">
            <ArrowLeftOutlined
              className="trigger"
              style={{ color: Theme.colorPrimaryLight, float: "left" }}
              onClick={() => backToLastPage(-1)}
            />
          </Space>
          <Dropdown
            trigger={["click"]}
            menu={{ items }}
            autoAdjustOverflow={true}
          >
            <Space className="trigger" style={{ float: "right" }}>
              <UserOutlined
                style={{
                  color: Theme.colorPrimaryLight,
                }}
              />
            </Space>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: 10,
            padding: 15,
            minHeight: 650,
            marginBottom: 0,
            // background: Theme.colorPrimaryLight,
            overflowY: "auto",
          }}
        >
          {props.children}
        </Content>
        <Footer
          style={{
            alignSelf: "center",
            justifySelf: "center",
            maxHeight: 30,
            margin: 10,
            padding: 0,
          }}
        >
          Made with <HeartFilled /> by Eduardo Colissi
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Template;
