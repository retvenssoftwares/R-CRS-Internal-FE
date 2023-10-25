import { BrowserRouter, Switch } from "react-router-dom";
import Routes from "./routes/";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setDashboardBooleanValue } from "./redux/slices/dashboard";
import DashboardLayout from "./components/layout/dashboardLayout";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isCrs = useSelector((state) => state.dashboardState.isBooleanValue);
  const isLogin = useSelector((state) => state.Login.isLoggedIn);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if the Alt key and Tab key are both pressed
      if (e.altKey && e.key === "Tab") {
        setVisible(!visible);

        // Your action here, for example, displaying an alert
        dispatch(setDashboardBooleanValue(visible));

        if (isCrs) {
          alert("Switching to CRM");
        } else {
          alert("Switching to CRS");
        }
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCrs]);

  // Empty dependency array means this effect runs once, like componentDidMount

  // useEffect(()=>{
  //    const localData = JSON.parse(window.localStorage.getItem('userContext'))

  //    if(localData && localData?.detailsr?.department[0].role === "Agent"){
  //     history('/agent/dashboard')
  //   }
  // },)
  return (
    <BrowserRouter>
      <Switch>
        {/* {isLogin ? (
          <DashboardLayout>
            <Routes />
          </DashboardLayout>
        ) : ( */}
          <Routes />
        {/* )} */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
