import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({currentId, setCurrentId }) => {

    // keep track of the data the user inputs
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });

    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [post]);

    // constantly update per key stroke postData with what the user enters 
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPostData((prevInfo) => {
            return {
                ...prevInfo,
                [name]: value
            }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // if there is no currently selected id, then we are creating a post
        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        }
        else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }

        clear();
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please sign in to create Memories and like other memories
                </Typography>
            </Paper>
        )
    }

    // Erases all data from form
    const clear = () => {
        setCurrentId(null);

        setPostData(() => {
            return {
                title: '',
                message: '',
                tags: '',
                selectedFile: ''
            }
        });
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Edit" : "Create"} a Memory</Typography>

                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={handleChange} required />
                <TextField name="message" variant="outlined" multiline minRows={4} label="Message" fullWidth value={postData.message} onChange={handleChange} required />
                <TextField name="tags" variant="outlined" label="Tags" required 
                    fullWidth value={postData.tags} onChange={(event) => setPostData({ ...postData, tags: event.target.value.split(',')})}/>

                <div className={classes.fileInput} required>
                    <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>

                <Button type="submit" className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth>Submit</Button>
                <Button onClick={clear} variant="contained" color="secondary" size="small" fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;