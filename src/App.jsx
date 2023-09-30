import { useContext } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ConfigProvider } from "antd";

import { AuthContext, AuthProvider } from "./contexts/auth";
// import GlobalStyle from "./globalStyles";

import Loading from "./components/Loading";

import Login from "./pages/authentication/Login/Login";
import CreatePeriod from "./pages/application/periods/CreatePeriod";
import Periods from "./pages/application/periods/Periods";
import EditPeriod from "./pages/application/periods/EditPeriod";

function App() {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <Loading />;
    }

    if (!authenticated) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2A9D8F",
          colorPrimaryLight: "#E9F2EF",
          colorPrimaryDark: "#264653",
          colorSecondary: "#E9C46A",
          colorSecondaryLight: "#F4A261",
          colorSecondaryDark: "#E76F51",
          colorLink: "#2A9D8F",
        },
      }}
    >
      <Router>
        {/* <GlobalStyle /> */}
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/period/create"
              element={
                <Private>
                  <CreatePeriod />
                </Private>
              }
            />
            <Route
              path="/periods"
              element={
                <Private>
                  <Periods />
                </Private>
              }
            />
            <Route
              path="/period/:id"
              element={
                <Private>
                  <EditPeriod />
                </Private>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ConfigProvider>
  );
}

export default App;
