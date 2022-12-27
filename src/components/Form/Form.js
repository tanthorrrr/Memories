import React, { useState, useEffect } from "react";
import useStyles from "./styles.js";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

//get the
const Form = ({ currentId, setCurrentId }) => {
     const [postData, setPostData] = useState({
          title: "",
          message: "",
          tags: "",
          selectedFile: "",
     });
     const post = useSelector((state) =>
          currentId ? state.posts.find((p) => p._id === currentId) : null
     );
     const classes = useStyles();
     const dispatch = useDispatch();
     const user = JSON.parse(localStorage.getItem("profile"));
     useEffect(() => {
          if (post) setPostData(post);
     }, [post]);
     const handelSubmit = (e) => {
          e.preventDefault();
          if (currentId === 0) {
               dispatch(createPost({ ...postData, name: user?.result.name }));
          } else {
               dispatch(updatePost(currentId, { ...postData, name: user?.result.name }));
          }
          clear();
     };
     const clear = () => {
          setCurrentId(0);
          setPostData({
               title: "",
               message: "",
               tags: "",
               selectedFile: "",
          });
     };
     if (!user?.result.name) {
          return (
               <Paper className={classes.paper}>
                    <Typography variant="h6" align="center">
                         Please Sign In to create your own memories and like othor's memories
                    </Typography>
               </Paper>
          );
     }
     return (
          <>
               <Paper className={classes.paper}>
                    <form
                         autoComplete="off"
                         onSubmit={handelSubmit}
                         noValidate
                         className={`${classes.root} ${classes.form}`}
                    >
                         <Typography variant="h6">
                              {currentId ? "Editting " : "Creating "}a Memory
                         </Typography>
                         {/* <TextField
                              name="creator"
                              variant="outlined"
                              label="Creator"
                              fullWidth
                              value={postData.creator}
                              onChange={(e) => {
                                   setPostData({ ...postData, creator: e.target.value });
                              }}
                         ></TextField> */}
                         <TextField
                              name="title"
                              variant="outlined"
                              label="Title"
                              fullWidth
                              value={postData.title}
                              onChange={(e) => {
                                   setPostData({ ...postData, title: e.target.value });
                              }}
                         ></TextField>
                         <TextField
                              name="message"
                              variant="outlined"
                              label="Message"
                              fullWidth
                              value={postData.message}
                              onChange={(e) => {
                                   setPostData({ ...postData, message: e.target.value });
                              }}
                         ></TextField>
                         <TextField
                              name="tags"
                              variant="outlined"
                              label="Tags"
                              fullWidth
                              value={postData.tags}
                              onChange={(e) => {
                                   setPostData({ ...postData, tags: e.target.value.split(",") });
                              }}
                         ></TextField>
                         <div className={classes.fileInput}>
                              <FileBase64
                                   type="file"
                                   multiple={false}
                                   onDone={({ base64 }) => {
                                        setPostData({ ...postData, selectedFile: base64 });
                                   }}
                              />
                         </div>
                         <Button
                              className={classes.buttonSubmit}
                              variant="contained"
                              size="large"
                              type="submit"
                              color="primary"
                              fullWidth
                         >
                              Submit
                         </Button>
                         <Button
                              variant="contained"
                              size="small"
                              color="secondary"
                              fullWidth
                              onClick={clear}
                         >
                              Clear
                         </Button>
                    </form>
               </Paper>
          </>
     );
};

export default Form;
