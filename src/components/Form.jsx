import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Spinner from "./Spinner";
import MuiAlert from "@material-ui/lab/Alert";
import RecipeReviewCard from "./RecipeReviewCard";
import getDate from "../../src/dateGenerator";
import Chip from "@material-ui/core/Chip";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      🚀Designed and developed by-
      <Link color="inherit" href="">
        visakhsanthosh69@gmail.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 320,
  },
}));

export default function Form() {
  const [pin, setPin] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [color, setColor] = React.useState("error");
  const [data, setData] = React.useState([]);
  const [dis, setDis] = React.useState("");
  const [count, setCount] = React.useState(1);
  const [district, setDistrict] = React.useState("");
  const [districts, setDistricts] = React.useState([]);

  const handleSubmit = async () => {
    setLoading(true);

    await fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${getDate()}`
    ).then((response) => {
      response.json().then((data) => {
        setLoading(false);
        setPin("");

        if (data.centers) {
          if (data.centers && data.centers.length === 0) {
            setAlert(true);
            setColor("warning");
            setMessage("No vaccination centers are available ..!!!");
            setData([]);
          } else {
            setAlert(true);
            setMessage("Vaccination centers are available ❤️..!!!");
            setColor("success");
            setData(data.centers);
          }
        } else if (data.error) {
          setAlert(true);
          setData([]);
          setColor("error");
          setMessage(data.error);
        } else {
          setAlert(true);
          setMessage("Something went wrong please try again later...!!");
        }
      });
    });
  };

  const searchByDistrict = async () => {
    setData([]);
    setCount(2);
    setMessage("");
    setAlert(false);

    await fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/17`)
      .then((response) => {
        response.json().then((data) => {
          //console.log(data.districts);
          setDistricts(data.districts);
        });
      })
      .catch((err) => {});
  };

  const handleDistrict = async () => {
    setLoading(true);

    await fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${getDate()}`
    ).then((response) => {
      response.json().then((data) => {
        setLoading(false);
        setPin("");

        if (data.centers) {
          if (data.centers && data.centers.length === 0) {
            setAlert(true);
            setColor("warning");
            setMessage("No vaccination centers are available ..!!!");
            setData([]);
          } else {
            setAlert(true);
            setMessage("Vaccination centers are available ❤️..!!!");
            setColor("success");
            setData(data.centers);
          }
        } else if (data.error) {
          setAlert(true);
          setData([]);
          setColor("error");
          setMessage(data.error);
        } else {
          setAlert(true);
          setMessage("Something went wrong please try again later...!!");
        }
      });
    });
  };

  const classes = useStyles();

  if (count === 1) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <div>
            <Chip
              className={classes.chip}
              color={count == 1 ? "primary" : ""}
              label="Search by pin"
              onClick={() => {
                setCount(1);
              }}
            />{" "}
            <Chip
              className={classes.chip}
              color={count == 1 ? "" : "primary"}
              label="Search by district"
              onClick={searchByDistrict}
            />
          </div>

          <Avatar className={classes.avatar}>🔍</Avatar>
          <Typography component="h1" variant="h5">
            Search vaccine
          </Typography>
          <div className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fname"
                  name="pin"
                  variant="outlined"
                  required
                  fullWidth
                  id="pin"
                  label="Enter your pincode"
                  autoFocus
                  onChange={(e) => {
                    setPin(e.target.value);
                  }}
                  value={pin}
                />
              </Grid>
            </Grid>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmit}
                >
                  Search
                </Button>
              </>
            )}
          </div>
          {alert ? <Alert severity={color}>{message}</Alert> : null}
        </div>
        {data.length > 0
          ? data.map((item) => {
              return (
                <Grid m={0.5} container spacing={2} style={{ padding: 20 }}>
                  <Grid item xs={12} sm={12}>
                    <RecipeReviewCard
                      center_id={item.center_id}
                      name={item.name}
                      address={item.name}
                      state={item.state_name}
                      district={item.district_name}
                      fee_type={item.fee_type}
                      session={item.sessions}
                      fee_type={item.fee_type}
                      pin={item.pincode}
                      //  available_capacity={item.available_capasity}
                      //  vaccine={item.vaccine}
                    />
                  </Grid>
                </Grid>
              );
            })
          : null}

        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
  if (count === 2) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <div>
            <Chip
              className={classes.chip}
              color={count == 2 ? "" : "primary"}
              label="Search by pin"
              onClick={() => {
                setCount(1);
                setData([]);
                setMessage("");
                setAlert(false);
              }}
            />{" "}
            <Chip
              className={classes.chip}
              color={count == 1 ? "" : "primary"}
              label="Search by district"
              onClick={searchByDistrict}
            />
          </div>

          <Avatar className={classes.avatar}>🔍</Avatar>
          <Typography component="h1" variant="h5">
            Search vaccine
          </Typography>
          <div className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    District
                  </InputLabel>
                  <Select
                    native
                    onChange={(e) => {
                      setDistrict(e.target.value);
                    }}
                    label="District"
                  >
                    <option aria-label="None" value="" />
                    {/* <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option> */}
                    {districts.map((dis) => {
                      return (
                        <option value={dis.district_id}>
                          {dis.district_name}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {loading ? (
              <>
                <br></br>
                <Spinner />
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleDistrict}
                >
                  Search
                </Button>
              </>
            )}
          </div>
          {alert ? <Alert severity={color}>{message}</Alert> : null}
        </div>
        {data.length > 0
          ? data.map((item) => {
              return (
                <Grid m={0.5} container spacing={2} style={{ padding: 20 }}>
                  <Grid item xs={12} sm={12}>
                    <RecipeReviewCard
                      center_id={item.center_id}
                      name={item.name}
                      address={item.name}
                      state={item.state_name}
                      district={item.district_name}
                      fee_type={item.fee_type}
                      session={item.sessions}
                      fee_type={item.fee_type}
                      pin={item.pincode}
                      //  available_capacity={item.available_capasity}
                      //  vaccine={item.vaccine}
                    />
                  </Grid>
                </Grid>
              );
            })
          : null}

        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}
