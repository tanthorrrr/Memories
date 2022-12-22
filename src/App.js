import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import FarmerLogo from "./images/Farmer1.png";
import Posts from "./components/Posts/Posts.js";
import Form from "./components/Form/Form.js";
import useStyles from "./styles.js";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts.js";
const App = () => {
     const classes = useStyles();
     const dispatch = useDispatch();
     const [currentId, setCurrentId] = useState(null);
     useEffect(() => {
          dispatch(getPosts());
     }, [currentId, dispatch]);
     return (
          <Container maxWidth="lg">
               <AppBar className={classes.appBar} position="static" color="inherit">
                    <Typography className={classes.heading} variant="h2" align="center">
                         Memories
                         <img
                              className={classes.image}
                              src={FarmerLogo}
                              height={"60"}
                              alt="memories"
                         />
                    </Typography>
               </AppBar>
               <Grow in>
                    <Container>
                         <Grid
                              container
                              justifyContent="space-between"
                              alignItems="stretch"
                              spacing={3}
                              className={classes.mainContainer}
                         >
                              <Grid item xs={12} sm={7}>
                                   <Posts setCurrentId={setCurrentId} />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                   <Form currentId={currentId} setCurrentId={setCurrentId} />
                              </Grid>
                         </Grid>
                    </Container>
               </Grow>
          </Container>
     );
};
export default App;
