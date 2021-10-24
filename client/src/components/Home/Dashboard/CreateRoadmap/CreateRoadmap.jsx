import React, { useState, useEffect, useContext } from 'react'

//componentn
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {
    // Avatar,
    Chip,
    // CircularProgress,
    // FormControl,
    // FormGroup,
    // Grid,
    // Tooltip,
    // Typography,
} from '@mui/material';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { UserContext } from '../../../../context/UserContext';

//classes 
import classes from "./CreateRoadmap.css"

const CreateRoadmap = (props) => {
    const [user, setUser] = useContext(UserContext)

    const [roadmapData, setRoadmapData] = useState({
        title: null, //require
        description: null,
        tags: [],
        path: [],
        user: user.id,
        private: false,
    })

    const [newTag, setNewTag] = useState(null)

    const changeHandler = (e) => {

        if (e.target.value == "on") {
            console.log(e, roadmapData.private)
            setRoadmapData(prev => ({
                ...prev,
                private: !prev.private
            }))
        }
        else
            setRoadmapData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
    }

    const addtags = (e) => {

        if (e.code === "Enter" || e.code === "NumpadEnter") {
            setRoadmapData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag]
            }))
            setNewTag("");
        }
    }

    const createHandler = async () => {
        console.log(roadmapData)
        try {
            let res = await fetch('/roadmaps/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roadmapData),
            });
            res = await res.json();

            if (!res.error) {
                props.handleClose()
                // history.replace('/');
                // setErrors('');
            } else {
                // setErrors(res || res.error);
            }
        } catch (e) {
            // setLoader(false);
            // setErrors('Something went wrong');
        }
    }

    const handleDelete = (i) => {
        console.info('You clicked the delete icon.');

        setRoadmapData((prev) => {

            let newtags = [...prev.tags];
            newtags.splice(i, 1);

            return {
                ...prev,
                tags: newtags
            };

        });
    };

    return (
        <div className={classes.CreateRoadmap}>
            <div className={classes.head}>
                <label>Create New Roadmap</label>
            </div>
            <TextField
                onChange={changeHandler}
                required
                style={{ margin: "10px 0" }}
                id="standard-basic"
                label="Roadmap Title/Goal"
                name="title"
                value={roadmapData.title || ""}
                variant="outlined" />
            <TextField
                style={{ margin: "10px 0" }}
                id="outlined-multiline-static"
                label="Description"
                name="description"
                multiline
                rows={4}
                onChange={changeHandler}
                value={roadmapData.description || ""}
            />
            <div className={classes.tags}>
                <TextField onKeyPress={addtags} size="small" onChange={(e) => setNewTag(e.target.value == "" ? null : e.target.value)} value={newTag || ""} style={{ margin: "10px 0" }} id="standard-basic" label="Tags" name="tags" variant="outlined" />
                <IconButton onClick={addtags} style={{ margin: "10px 0" }} size="small" color="primary" aria-label="add">
                    <AddBoxIcon />
                </IconButton>
                <div className={classes.box}>
                    {roadmapData.tags.length ? roadmapData.tags.map((t, index) => (
                        <Chip
                            style={{ margin: '0 5px' }}
                            key={index}
                            label={t}
                            variant="outlined"
                            onDelete={() => handleDelete(index)}
                        />
                    )) : null}
                </div>

            </div>
            <FormControlLabel
                control={
                    <Switch
                        checked={roadmapData.private}
                        onChange={changeHandler}
                    />}
                label="I want this to be private"
            />

            <Button onClick={createHandler} disabled={!roadmapData.title} variant="contained" size="small">Create</Button>

        </div>
        ////------------create modals component------------

    )
}

export default CreateRoadmap
