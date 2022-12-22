import React, { useState, useEffect } from "react";
import useStyles from "./styles.js";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

//get the
const Form = ({ currentId, setCurrentId }) => {
     const [postData, setPostData] = useState({
          creator: "",
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
     useEffect(() => {
          if (post) setPostData(post);
     }, [post]);
     const handelSubmit = (e) => {
          e.preventDefault();
          if (currentId) {
               dispatch(updatePost(currentId, postData));
          } else {
               dispatch(createPost(postData));
          }
          clear();
     };
     const clear = () => {
          setCurrentId(0);
          setPostData({
               creator: "",
               title: "",
               message: "",
               tags: "",
               selectedFile: "",
          });
     };
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
                         <TextField
                              name="creator"
                              variant="outlined"
                              label="Creator"
                              fullWidth
                              value={postData.creator}
                              onChange={(e) => {
                                   setPostData({ ...postData, creator: e.target.value });
                              }}
                         ></TextField>
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
