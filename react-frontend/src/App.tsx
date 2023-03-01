import MainHeader from "./components/main/MainHeader";
import { Fragment } from "react";
import Routing from "./components/Routing";
import RefreshHandler from "./components/RefreshHandler";
import Footer from "./components/footer/Footer";
import Navigation from "./components/main/Navigation";




const App = () => {

  //TEST

  return (
    <Fragment >
      <RefreshHandler />
      <Navigation />
      <Routing />
      <Footer />
    </Fragment>
  );
}


export default App;
