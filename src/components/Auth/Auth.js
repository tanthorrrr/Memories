import React, { useEffect, useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import useStyles from "./styles.js";
import Input from "./Input";
import Icon from "./icon";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Auth = () => {
     const classes = useStyles();
     const [isSignup, setIsSignup] = useState(true);
     const [showPassword, setShowPassword] = useState(false);
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const handleSubmit = () => {};
     const handleChange = () => {};
     const handleShowPassword = () => {
          setShowPassword((prevShowPassword) => !prevShowPassword);
     };
     const switchMode = () => {
          setIsSignup((prevSwitchMode) => !prevSwitchMode);
          setShowPassword(false);
     };
     const googleFailure = (error) => {
          console.log(error);
     };
     const googleSuccess = async (res) => {
          const result = res?.profileObj;
          const token = res?.tokenObj;
          try {
               dispatch({ type: "AUTH", data: { result, token } });
               navigate("/");
          } catch (error) {
               console.log(error);
          }
     };
     const clientId = "116917853173-nm0ebn5ef2n722k3t3sktenn579rq0o9.apps.googleusercontent.com";
     useEffect(() => {
          gapi.load("client:auth2", () => {
               gapi.auth2.init({
                    clientId: clientId,
               });
          });
     }, []);
     return (
          <Container component="main" maxWidth="xs">
               <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                         <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">{isSignup ? "Sign In" : "Sign Up"}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                         <Grid container spacing={2}>
                              {!isSignup && (
                                   <>
                                        <Input
                                             name="firstName"
                                             label="First Name"
                                             handleChange={handleChange}
                                             autoFocus
                                             half
                                        />

                                        <Input
                                             name="lastName"
                                             label="Last Name"
                                             handleChange={handleChange}
                                             half
                                        />
                                   </>
                              )}
                              <Input
                                   name="email"
                                   label="Email Address"
                                   handleChange={handleChange}
                                   type="email"
                              />
                              <Input
                                   name="password"
                                   label="Password"
                                   handleChange={handleChange}
                                   type={showPassword ? "text" : "password"}
                                   handleShowPassword={handleShowPassword}
                              />
                              {!isSignup && (
                                   <Input
                                        name="confirmPassword"
                                        label="Repeat Password"
                                        handleChange={handleChange}
                                        type="password"
                                   />
                              )}
                         </Grid>

                         <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              className={classes.submit}
                         >
                              {!isSignup ? "Sign Up" : "Sign In"}
                         </Button>

                         <GoogleLogin
                              clientId={clientId}
                              render={(renderProps) => (
                                   <Button
                                        className={classes.googleButton}
                                        color="primary"
                                        fullWidth
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        startIcon={<Icon />}
                                        variant="contained"
                                   >
                                        Google Sign In
                                   </Button>
                              )}
                              onFailure={googleFailure}
                              onSuccess={googleSuccess}
                              cookiePolicy="single_host_origin"
                         />
                         <Grid container justifyContent="flex-end">
                              <Grid item>
                                   <Button onClick={switchMode} color="primary">
                                        {isSignup
                                             ? "Don't have an account? Sign up"
                                             : "Already have an account? Sign in"}
                                   </Button>
                              </Grid>
                         </Grid>
                    </form>
               </Paper>
          </Container>
     );
};

export default Auth;
