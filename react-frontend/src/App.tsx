import MainHeader from "./components/header/MainHeader";
import { Fragment } from "react";
import Routing from "./components/Routing";
import RefreshHandler from "./components/RefreshHandler";

//for fresh logins when restarting the project


const App = (props) => {

//TEST

  return (
    <Fragment >
      <RefreshHandler />
      <MainHeader />
      <Routing />
    </Fragment>
  );
}


export default App;
