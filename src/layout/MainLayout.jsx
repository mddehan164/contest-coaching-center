import { Footer, HeaderMain } from "../components";
import { Outlet } from "react-router-dom";
import "../index.css";

const MainLayout = () => {
  return (
    <div className="padding">
      <HeaderMain />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
