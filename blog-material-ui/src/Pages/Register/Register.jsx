import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import validate from "./../../components/Validition/register";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import requests from "./../../apis/register/requests";

import { Box } from "@mui/material";
const useStyles = makeStyles({

  root:{
   
     margin: "10px auto" ,
      maxWidth:"70%",
      padding:"0.2rem",


  },
  Header:{
    backgroundColor: "lightblue" ,
    textAlign:"center",
    color:"teal",
    padding:"10px 0"

  },
  notification:{
    marginBottom:"20px"
  },
  footer:{
 marginTop:"30px",
textAlign:"center",
 width:"100%",
  }
})
const Register = (props) => {
  const classes = useStyles(props)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [values, setValues] = useState({
      username: "",
      email: "",
      password:""
      ,confirm_pass:"" 
    });
    let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [ValidationStatus, setValidationStatus] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "warning",
    text: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    //validation

    const username = values.username ? values.username.trim() : values.username;
    const email = values.email ? values.email.trim() : values.email;
    const password = values.password ? values.password.trim() : values.password;
    const confirm_pass = values.confirm_pass ? values.confirm_pass.trim() : values.confirm_pass;
    const validationErrors = validate( username ,email ,password ,confirm_pass);
    setErrors(validationErrors);
    let validStatus = Object.values(validationErrors).every((x) => x === "");
    if (validStatus) {
      setValidationStatus(true);
    } else {
      setValidationStatus(false);
    }

  };
  let goToLogin = () => {
  
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 2000);
  };

  useEffect(() => {
    const sendUser = async (dataToSend) => {
      const results = await requests.addOneUser(dataToSend);

      const { response, data } = results;

      console.log(response, data);
      if (response.ok) {
        setNotification({
          show: true,
          type: "success",
          text: "Congratulation ,the user has been successfully Added",
        });
        goToLogin();
      } else if (data) {
        const err = data.message || {};
        if (err) {
          setNotification({
            show: true,
            type: "warning",
            text: err,
          });
        }
      } else {
        setNotification({
          show: true,
          type: "error",
          text: "unknownerror",
        });
      }
    };
    try {
      if (submitted) {
        if (ValidationStatus) {
          //for frontend before backend

          sendUser(values);
          setValidationStatus(false);
        }
        setSubmitted(false);
      }

      // validation-start-frontend

      // validation-end-frontend
    } catch (error) {
      console.log(error);
    }
  }, [submitted]);
  
  return (

    <>
            <Grid container className={classes.root}
         justifyContent="space-between"
         direction={matches ? "column" : "row"}
         >
          <Grid item  xs={12} >
              <Typography component="h3" variant ="h3" gutterBottom className={classes.Header}>

                REGISTER
              </Typography>

          </Grid>
        <Stack sx={{ width: "100%" }} className={classes.notification}>
          {notification.show && (
            <Alert severity={notification.type} variant="filled">
              {notification.text}
            </Alert>
          )}
        </Stack>
      <form onSubmit={handleSubmit}>

            <TextField
        sx={{ mb: 1.5 }}
        label="user name"
        name="username"
        value={values.username}
        onChange={handleInputChange}
        error={!!errors.username}
        helperText={errors.username && errors.username}
        fullWidth
      />
            <TextField
        sx={{ mb: 1.5 }}
        label="Email"
        name="email"
        value={values.email}
        onChange={handleInputChange}
        error={!!errors.email}
        helperText={errors.email && errors.email}
        fullWidth
      />
            <TextField
        sx={{ mb: 1.5 }}
        label="Password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleInputChange}
        error={!!errors.password}
        helperText={errors.password && errors.password}
        fullWidth
      />
      <TextField
        sx={{ mb: 1.5 }}
        label="Comfirm Password"
        type="password"
        name="confirm_pass"
        value={values.confirm_pass}
        onChange={handleInputChange}
        error={!!errors.confirm_pass}
        helperText={errors.confirm_pass && errors.confirm_pass}
        fullWidth
      />
      <Button fullWidth variant="contained" type="submit" color="error">
        Submit
      </Button>
    </form>

    <Box className={classes.footer}>
          <Grid
            container
            justifyContent= "center"
            
          >
            <p> &nbsp; Already have an account? &nbsp;</p>
            <Link to="/login">Login</Link>

          </Grid>

    </Box>
         </Grid>

    </>

  );
};

export default Register;