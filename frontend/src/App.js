import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePag from "./Pages/Home";
import AdminPage from "./Pages/Admin";
import SellerPage from "./Pages/Seller";
import ClientPage from "./Pages/Client";
import LogIn from "./Pages/LogIn";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePag />} />
        <Route exact path="/Admin" element={<AdminPage />} />
        <Route exact path="/Seller" element={<SellerPage />} />
        <Route exact path="/Client" element={<ClientPage />} />
        <Route exact path="/LogIn" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
