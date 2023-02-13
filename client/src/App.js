import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/ProtectedRoute";
import Header from "./components/Header";
import Rez from "./components/Rez";
import RezList from "./components/RezList";
import RestoList from "./components/RestoList";
import Resto from "./components/Resto";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/restaurants/:id" element={<ProtectedRoute />}>
            <Route path="/restaurants/:id" element={<Resto />} />
          </Route>

          <Route path="/reservations/:id" element={<ProtectedRoute />}>
            <Route path="/reservations/:id" element={<Rez />} />
          </Route>

          <Route path="/reservations" element={<ProtectedRoute />}>
            <Route path="/reservations" element={<RezList />} />
          </Route>

          <Route path="/" element={<RestoList />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
