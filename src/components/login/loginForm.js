import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { signIn, authenticate } from "../../actions/auth";
import Alert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "../../actionTypes";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import logo from "../../assets/logo.webp";
import { setLoggedIn } from "../../redux/slices/isLogin";
import { toast } from "react-toastify";

const useStyles = makeStyles({
  form: {
    padding: "0px",
    borderRadius: "10px",
    margin: "5px",
  },
  login: {
    minWidth: "100%",
    borderRadius: 4,
    backgroundColor: "#98c925",
    padding: "10px 30px",
    fontSize: "18px",
    color: "white",
  },
  root: {
    display: "table",
    position: "absolute",
    top: 0,
    left: 0,
    height: "90%",
    width: "100%",
  },
  middle: {
    display: "table-cell",
    verticalAlign: "middle",
  },
  inner: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
  logo: {
    padding: "12px 7px 12px 7px",
  },
});

const LoginForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const [login, setLogin] = useState({
    credentials: {
      email: "",
      password: "",
    },
    isLoading: false,
    error: "",
    success: "",
  });

  //redux
  const dispatch = useDispatch();
  const userDataFromStore = useSelector((state) => state.userInfo);
  const hotelsDataFromStore = useSelector((state) => state.hotelList);
  const { loggedInUser, get_hotel_list } = bindActionCreators(
    actions,
    dispatch
  );

  const [role, setRole] = useState(null);
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("userContext"));
    if (role) {
      setRole(role?.details["department"][0].role);
    }
  });

  const handleChange = (type) => (e) => {
    switch (type) {
      case "userName":
        setLogin({
          ...login,
          credentials: { ...login.credentials, userName: e.target.value },
        });
        break;
      case "password":
        setLogin({
          ...login,
          credentials: { ...login.credentials, password: e.target.value },
        });
        break;
      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin({ ...login, isLoading: true });
    signIn({
      userName: login.credentials.userName,
      password: login.credentials.password,
    })
      .then((value) => {
        setLogin({ ...login, isLoading: false, success: value.message });
        authenticate(value, () => {
          let userDataFromServer = value.employee;
          window.localStorage.setItem(
            "employee_id",
            JSON.stringify(value.details.employee_id)
          );
          dispatch(setLoggedIn(true))
          if (value.details.department[0].role === "Admin") {
            history.push("/admin/dashboard");
          } else if (value.details.department[0].role === "Agent") {
            history.push("/agent/dashboard");
          } else if (value.details.department[0].role === "SuperAdmin") {
            history.push("/superadmin/dashboard");
          }
        });
      })
      .catch((err) => {
        toast.error(err.response.data.msg,{position:'bottom-right'})
        setLogin({ ...login, isLoading: false, error: err.error });
      });
  };


  return (
    <>
      <div className={classes.root}>
        <div className={classes.middle}>
          <div className={classes.inner}>
            <Grid
              container
              justify="center"
              style={{
                background: "rgb(7 104 155)",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined" className={classes.form}>
                  <Grid
                    container
                    justifyContent="center"
                    style={{
                      background: "white",
                      height: "100px",
                      width: "100%",
                      padding: "0px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Grid
                      item
                      sm={6}
                      md={8}
                      xs={12}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                     
                      <img
                        src={logo}
                        height={"100px"}
                        style={{ marginTop: "10px" }}
                      />
                    </Grid>

                  </Grid>
                  {login.success && (
                    <Alert severity="success">{login.success}</Alert>
                  )}
                  {login.error && <Alert severity="error">{login.error}</Alert>}
                  <br />
                  <form onSubmit={handleSubmit}>
                    {/* logo */}
                    <Grid
                      container
                      style={{ padding: "20px", flexDirection: "column" }}
                    >
                      <Grid item xs={12} style={{ display: "flex" }}>
                        <div
                          style={{
                            backgroundColor: "#98c925",
                            height: "50px",
                            width: "80px",
                            borderTopLeftRadius: "5px",
                            borderBottomLeftRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <PersonIcon style={{ color: "white" }} />
                        </div>
                        <TextField
                          type="text"
                          variant="filled"
                          fullWidth
                          size="small"
                          label="Username"
                          InputProps={{
                            style: {
                              height: "50px",
                            },
                          }}
                          disabled={login.isLoading}
                          onChange={handleChange("userName")}
                          sx={{ input: { color: "red" } }}
                          value={login.credentials.userName}
                          style={{ marginBottom: "20px" }}
                        />
                      </Grid>
                      <Grid item xs={12} style={{ display: "flex" }}>
                        <div
                          style={{
                            backgroundColor: "#98c925",
                            height: "50px",
                            width: "80px",
                            borderTopLeftRadius: "5px",
                            borderBottomLeftRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <LockIcon style={{ color: "white" }} />
                        </div>
                        <TextField
                          type="password"
                          variant="filled"
                          fullWidth
                          size="small"
                          label="Password"
                          disabled={login.isLoading}
                          onChange={handleChange("password")}
                          value={login.credentials.password}
                          InputProps={{
                            style: {
                              height: "50px",
                            },
                          }}
                        />
                      </Grid>
                    </Grid>

                    <br />
                    <br />
                    <Grid container justify="center">
                      <Grid item sm={11} md={11} xs={11}>
                        <Button
                          variant="contained"
                          fullWidth
                          className={classes.login}
                          type="submit"
                          disabled={login.isLoading}
                        >
                          Login
                        </Button>
                      </Grid>
                    </Grid>
                    <br />
                    
                  </form>
                </Card>
              </Grid>
            </Grid>
            {/* <Signup /> */}

          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

