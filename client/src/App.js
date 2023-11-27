import "./App.css";
import { Routes, Route } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import ProtectedRoute from "./auth/ProtectedRoute";
import Reservation from "./components/Reservation";
import ReservationList from "./components/ReservationList";
import RestaurantList from "./components/RestaurantList";
import Restaurant from "./components/Restaurant";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import SideBar from "./components/SideBar";

const App = () => {
  // const { isLoading } = useAuth0();

  // if (isLoading) {
  //   return <p>Cranking up the database... Just a moment</p>;
  // }
  return (
    <>
      <Header />
      <div className="container">
        {/* <div className="header1">
          <Header />
        </div>
        <div className="sideBar1">
          <SideBar />
        </div> */}

        <Routes>
          {/* <Route path="/restaurants/:id" element={<ProtectedRoute />}> */}
          <Route path="/restaurants/:id" element={<Restaurant />} />
          {/* </Route> */}

          {/* <Route path="/reservations/:id" element={<ProtectedRoute />}> */}
          <Route path="/reservations/:id" element={<Reservation />} />
          {/* </Route> */}

          {/* <Route path="/reservations" element={<ProtectedRoute />}> */}
          <Route path="/reservations" element={<ReservationList />} />
          {/* </Route> */}

          <Route path="/" element={<RestaurantList />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
