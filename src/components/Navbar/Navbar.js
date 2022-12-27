import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles.js";
import FarmerLogo from "../../images/Farmer1.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Navbar = () => {
     const classes = useStyles();

     const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const location = useLocation();
     const handleLogout = () => {
          dispatch({ type: "LOGOUT" });
          navigate("/");
          setUser(null);
          window.location.reload(false);
     };
     useEffect(() => {
          const token = user?.token;
          if (token) {
               const decodeToken = decode(token);
               if (decodeToken.exp * 1000 < new Date().getTime()) handleLogout();
          }
          setUser(JSON.parse(localStorage.getItem("profile")));
     }, [location]);
     return (
          <AppBar className={classes.appBar} position="static" color="inherit">
               <div className={classes.brandContainer}>
                    <Typography
                         component={Link}
                         to="/"
                         className={classes.heading}
                         variant="h2"
                         align="center"
                    >
                         Memories
                    </Typography>
                    <img className={classes.image} src={FarmerLogo} height={"60"} alt="memories" />
               </div>
               <Toolbar className={classes.toolbar}>
                    {user ? (
                         <div className={classes.profile}>
                              <Avatar
                                   alt={user.result.name}
                                   src={user.result.imageUrl}
                                   className={classes.purple}
                              >
                                   {user.result.name.charAt(0)}
                              </Avatar>
                              <Typography className={classes.userName} variant="h6">
                                   {user.result.name}
                              </Typography>
                              <Button
                                   variant="contained"
                                   className={classes.logout}
                                   color="secondary"
                                   onClick={handleLogout}
                              >
                                   Logout
                              </Button>
                         </div>
                    ) : (
                         <Button component={Link} to="/auth" variant="contained" color="primary">
                              Sign in
                         </Button>
                    )}
               </Toolbar>
          </AppBar>
     );
};

export default Navbar;
