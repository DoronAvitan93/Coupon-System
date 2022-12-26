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
      <Footer />
      <MainHeader />
      <Routing />
    </Fragment>
  );
}


export default App;
