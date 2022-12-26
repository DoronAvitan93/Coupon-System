import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { RootState } from "../store/reduxIndex";
import DeleteCompany from "./admin/DeleteCompany";
import DeleteCustomer from "./admin/DeleteCustomer";
import GetAllCompanies from "./admin/GetAllCompanies";
import GetAllCustomers from "./admin/GetAllCustomers";
import GetOneCompany from "./admin/GetOneCompany";
import GetOneCustomer from "./admin/GetOneCustomer";
import UpdateCompany from "./admin/UpdateCompany";
import UpdateCustomer from "./admin/UpdateCustomer";
import AddCoupon from "./company/AddCoupon";
import DeleteCoupon from "./company/DeleteCoupon";
import GetCompanyDetails from "./company/GetCompanyDetails";
import UpdateCoupon from "./company/updateCoupon";
import GetCustomerDetail from "./customer/GetCustomerDetail";
import PurchaseCoupon from "./customer/PurchaseCoupon";
import About from "./header/About";
import Home from "./header/Home";
import Login from "./Login/Login";
import Register from "./register/Register";
import GetCompanyCouponsOptions from "./company/GetCompanyCouponsOptions";
import GetCustomerCouponsOptions from "./customer/GetCustomerCouponsOptions";
import Logout from "./header/Logout";


//Routing here
const Routing = () => {

  const isAuth = useSelector<RootState>(state => state.authRedux.isAuthenticated);
  const isAuthType = useSelector<RootState>(state => state.authRedux.clientType);


  return (
    <Fragment>

      <Routes>

        <Route path="home" element={<Home />} />

        <Route path="/" element={<Home />} />

        <Route path="about" element={<About />} />

        <Route path="register" element={<Register />} />

        <Route path="login" element={<Login />} />

        <Route path="logout" element={<Logout />} />


        {/* //Admin functions */}
        {isAuth && isAuthType === "Administrator" &&

          <>
            <Route path="/AdminUpdateCompany" element={<UpdateCompany />} />

            <Route path="/AdminDeleteCompany" element={<DeleteCompany />} />

            <Route path="/AdminGetAllCompanies" element={<GetAllCompanies />} />

            <Route path="/AdminGetOneCompany" element={<GetOneCompany />} />

            <Route path="/AdminUpdateCustomer" element={<UpdateCustomer />} />

            <Route path="/AdminDeleteCustomer" element={<DeleteCustomer />} />

            <Route path="/AdminGetAllCustomers" element={<GetAllCustomers />} />

            <Route path="/AdminGetOneCustomer" element={<GetOneCustomer />} />
          </>
        }


        {/* //Company functions */}

        {isAuth && isAuthType === "Company" &&
          <>
            <Route path="/CompanyAddCoupon" element={<AddCoupon />} />

            <Route path="/CompanyUpdateCoupon" element={<UpdateCoupon />} />

            <Route path="/CompanyDeleteCoupon" element={<DeleteCoupon />} />

            <Route path="/GetCompanyCouponOptions" element={<GetCompanyCouponsOptions />} />

            <Route path="/GetCompanyDetails" element={<GetCompanyDetails />} />
          </>
        }

        {/* //Customer functions */}

        {isAuth && isAuthType === "Customer" &&
          <>
            <Route path="/GetCustomerDetails" element={<GetCustomerDetail />} />

            <Route path="/PurchaseCoupon" element={<PurchaseCoupon />} />

            <Route path="/GetCustomerCouponOptions" element={<GetCustomerCouponsOptions />} />
          </>
        }


      </Routes>

    </Fragment >
  );
};


export default Routing;
