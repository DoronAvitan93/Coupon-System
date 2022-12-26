import MainHeader from "./components/header/MainHeader";
import { Fragment } from "react";
import Routing from "./components/Routing";
import RefreshHandler from "./components/RefreshHandler";
import Footer from "./components/footer/Footer";




const App = () => {

  //TEST

  return (
    <Fragment >
      <RefreshHandler />
      <MainHeader />
      <Routing />
      <Footer />
    </Fragment>
  );
}


export default App;
