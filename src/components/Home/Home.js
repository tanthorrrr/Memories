import React, { useEffect, useState } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPosts } from "../../actions/posts";
import { useDispatch } from "react-redux";
import useStyles from "./styles.js";

const Home = () => {
     const dispatch = useDispatch();
     const [currentId, setCurrentId] = useState(0);
     useEffect(() => {
          dispatch(getPosts());
     }, [currentId, dispatch]);
     const classes = useStyles();

     return (
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
     );
};

export default Home;
