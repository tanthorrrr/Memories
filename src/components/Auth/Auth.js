import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles.js";
import Input from "./Input";
const Auth = () => {
     const classes = useStyles();
     const [isSignup, setIsSignup] = useState(true);
     const [showPassword, setShowPassword] = useState(false);
     const handleSubmit = () => {};
     const handleChange = () => {};
     const handleShowPassword = () => {
          setShowPassword((prevShowPassword) => !prevShowPassword);
     };
     const switchMode = () => {
          setIsSignup((prevSwitchMode) => !prevSwitchMode);
          setShowPassword(false);
     };
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
