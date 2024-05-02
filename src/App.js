import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Order from "./pages/order/Order";
import Profiles from "./pages/profiles/Profiles";
import Log from "./pages/log/Log";
import './App.css'
import LogSorties from "./pages/logsorties/logSorties";
import LogEntrees from "./pages/logentrees/LogEntrees";
import Rapport1 from "./pages/rapports/Rapport1";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
      <main className="content">
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={ <RequireAuth> <Home /> </RequireAuth> } />

            {/* <Route path="ouverture">
              <Route index element={ <RequireAuth> <OuvertureModal /> </RequireAuth> } />
            </Route> */}

            <Route path="users">
              <Route index element={ <RequireAuth> <List /> </RequireAuth> } />
              <Route path=":userId" element={ <RequireAuth> <Single /> </RequireAuth> } />
              <Route path="new" element={ <RequireAuth><New inputs={userInputs} title="Ajouter un nouvel utilisateur" /> </RequireAuth> } />
            </Route>
            
            <Route path="order">
              <Route index element={ <RequireAuth> <Order /> </RequireAuth> } />
            </Route>

            <Route path="logentrees">
              <Route index element={ <RequireAuth> <LogEntrees /> </RequireAuth> } />
            </Route>
            
            <Route path="logsorties">
              <Route index element={ <RequireAuth> <LogSorties /> </RequireAuth> } />
            </Route>

            <Route path="log">
              <Route index element={ <RequireAuth> <Log /> </RequireAuth> } />
            </Route>

            <Route path="rapport_1">
              <Route index element={ <RequireAuth> <Rapport1 /> </RequireAuth> } />
            </Route>

            <Route path="profiles">
              <Route index element={ <RequireAuth> <Profiles /> </RequireAuth> } />
            </Route>

          </Route>
        </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
