import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { DarkModeContext } from "./context/darkModeContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Order from "./pages/order/Order";
import Profiles from "./pages/profiles/Profiles";
import Log from "./pages/log/Log";
import LogSorties from "./pages/logsorties/logSorties";
import LogEntrees from "./pages/logentrees/LogEntrees";
import Edit from "./pages/edit/Edit";
import Stats from "./pages/stats/Stats";
import Test from "./components/PDF/test";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import './App.css';
import { db } from "./firebase";
import { getDoc, doc } from "firebase/firestore";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        if(currentUser) {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if(userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.role);
            console.log("User role:", userData.role);
          } else {
            console.log("User document not found");
          }
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
      }
    };
    fetchUserRole();
  }, [currentUser]);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const RestrictByRole = ({ allowedRoles, children }) => {
    if (userRole && allowedRoles.includes(userRole)) {
      return children;
    } else {
      // Afficher un toast d'avertissement
      toast.error("Vous n'avez pas les droits d'accès à cette page !");
      return <Navigate to="/unauthorized" />;
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <main className="content">
          <Routes>
            <Route path="/">
              <Route path="login" element={<Login />} />
              <Route index element={<RequireAuth><Home /></RequireAuth>} />

              <Route path="users">
                <Route index element={
                <RequireAuth><RestrictByRole allowedRoles={["admin"]}>
                  <List />
                  </RestrictByRole></RequireAuth>} />
                <Route path=":userId" element={
                <RequireAuth>
                  <Single />
                  </RequireAuth>} />

                <Route path="new" element={
                <RequireAuth><RestrictByRole allowedRoles={["admin"]}>
                  <New inputs={userInputs} title="Ajouter un nouvel utilisateur" />
                  </RestrictByRole>
                  </RequireAuth>} />

                <Route path="edit/:userId" element={
                <RequireAuth><RestrictByRole allowedRoles={["admin"]}>
                  <Edit inputs={userInputs} title="modifier utilisateur" />
                  </RestrictByRole>
                  </RequireAuth>} />
              </Route>


              <Route path="order" element={
              <RequireAuth><RestrictByRole allowedRoles={["employee", "manager", "admin"]}>
                <Order />
                </RestrictByRole></RequireAuth>} />

              <Route path="logentrees" element={
              <RequireAuth><RestrictByRole allowedRoles={["employee", "manager", "admin"]}>
                <LogEntrees />
                </RestrictByRole></RequireAuth>} />

              <Route path="logsorties" element={
              <RequireAuth><RestrictByRole allowedRoles={["employee", "manager", "admin"]}>
                <LogSorties />
                </RestrictByRole></RequireAuth>} />

              <Route path="log" element={
              <RequireAuth><RestrictByRole allowedRoles={["employee", "manager", "admin"]}>
                <Log />
                </RestrictByRole></RequireAuth>} />

              <Route path="profiles" element={
              <RequireAuth><RestrictByRole allowedRoles={["employee", "manager", "admin"]}>
                <Profiles />
                </RestrictByRole></RequireAuth>} />

              <Route path="stats" element={
              <RequireAuth><RestrictByRole allowedRoles={["manager", "admin"]}>
                <Stats />
              </RestrictByRole></RequireAuth>} />

              <Route path="pdf-email" element={
              <RequireAuth><RestrictByRole allowedRoles={["manager", "admin"]}>
                <Test />
              </RestrictByRole></RequireAuth>} />

              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
