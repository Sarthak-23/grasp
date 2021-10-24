import React, {useState, useEffect, useContext, useParams} from 'react';

//component
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

//user
import { UserContext } from '../../../context/UserContext';

//classes
import classes from "./Roadmap.css";

const roadmap_temp = {
  _id: "98342323rwo",
  title: "Placement",
  description: "This is the discription about the placement!",
  start: "21 March, 2002",
  // user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     require: true,
  //     ref: 'User',
  // },
  // parent: { type: mongoose.Schema.Types.ObjectId, default: null }, // if cloned from other roadmap
  path: [
      {
          index: 0, //  sort order
          topic: "Data Structure",
          subpath: [
              {
                  index: 0, // sort order
                  topic: "Array",
                  description: "This is array!",
                  materials: ["String"],
              },
              {
                  index: 1, // sort order
                  topic: "Stack",
                  description: "This is Stack!",
                  materials: ["String"],
              },
              {
                  index: 2, // sort order
                  topic: "Queue",
                  description: "This is Queue!",
                  materials: ["String"],
              },
          ],
      },
      {
          index: 1, //  sort order
          topic: "Resume",
          subpath: [
              {
                  index: 0, // sort order
                  topic: "Language",
                  description: "This is array!",
                  materials: ["String"],
              },
              {
                  index: 1, // sort order
                  topic: "Experience",
                  description: "This is Stack!",
                  materials: ["String"],
              },
              {
                  index: 2, // sort order
                  topic: "Projects",
                  description: "This is Queue!",
                  materials: ["String"],
              },
          ],
      },
      {
          index: 2, //  sort order
          topic: "Interview",
          subpath: [
              {
                  index: 0, // sort order
                  topic: "Why you are good for this job?",
                  description: "This is array!",
                  materials: ["String"],
              },
              {
                  index: 1, // sort order
                  topic: "Who the hell are you?",
                  description: "This is Stack!",
                  materials: ["String"],
              },
              {
                  index: 2, // sort order
                  topic: "Fuck off!",
                  description: "This is Queue!",
                  materials: ["String"],
              },
          ],
      },
  ],
  tags: ["Tag", "Tag", "Tag"],
  // private: { type: Boolean, default: false },
}

const notes_temp = [
  {
    title: 'title 1',
    _id: "asldk20394nmd",
    content: "This is the content of this note!", // can be markdown and what not
    date: '21 March, 2021',
  },
  {
    title: 'title 2',
    _id: "a02-842jlksdj9nl",
    content: "This is the content of this note!", // can be markdown and what not
    date: '21 March, 2021',
  },
  {
    title: 'title 3',
    _id: "lv3928jldjs-q2idsap",
    content: "This is the content of this note!", // can be markdown and what not
    date: '21 March, 2021',
  },
]

const date = new Date()

const Roadmap = (props) => {
  
  const { params } = useParams();

  const [roadmap, setRoadmap] = useState(null)
  const [loader, setLoader] = useState(null)
  const [user, setUser] = useContext(UserContext) // {_id, username, name, goals, connnections, pending, recieve}
  const [createPath, setCreatePath] = useState({ topic: null, data: [], showModal: false, index: 0 })
  
  const [error, setErrors] = useState(null)

  const [notes, setNotes] = useState({
    data: null,
    modalContent: {
      title: 'title 1',
      _id: "asldk20394nmd",
      content: "This is the content of this note!", // can be markdown and what not
      date: '21 March, 2021',
      showModal: true,
    }
  })

  useEffect(async() => {

    try {
        let res = await fetch(`/roadmaps/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        res = await res.json();
        console.log(res);

        if (res._id) {
          setRoadmap(res);
          console.log(res);
            // history.replace('/');
            setErrors('');
        } else {
            setErrors(res || res.error);
        }
    } catch (e) {
        setLoader(false);
        setErrors('Something went wrong');
    }

    setRoadmap(roadmap_temp);
    setNotes(prev => ({
      ...prev,
      data: notes_temp,
    }))
  }, [])


  const viewNoteModal = (id) => {
    //requesting for data
  }

  const addHandler = () => {
    setCreatePath(prev => ({
      ...prev,
      showModal: true
    }))
  }

  const closeModal = (a=1) => {
    
    if(a)
    setCreatePath(prev => ({
      ...prev,
      showModal: false
    }))
    else
    setNotes(prev=>({
      ...prev,
      modalContent: {
        ...prev.modalContent,
        showModal: false
      }
    }))

  }

  const createSubPath = (newData) => {
    setCreatePath(prev => ({
      ...prev,
      data: [...prev.data, newData],
      showModal: false,
      index: prev.index+1
    }))
  }

  const removeLast = () => {
    setCreatePath(prev => ({
      ...prev,
      data: [...prev.data].splice(0, prev.data.length-1)
    }))
  }

  const createPathHandler = () => {
    setRoadmap(prev => ({
      ...prev,
      path: [
        ...prev.path,
        {
          index: roadmap.length,
          topic: createPath.topic,
          subpath: createPath.data
        }
      ]
    }))
    setCreatePath({topic: null, data: [], showModal: false, index: 0})
  }

  return (
    (roadmap && notes) &&
    <div className={classes.Roadmap}>
      {(createPath.showModal || notes.modalContent.showModal) &&
        <div className={classes.Modal}>
        <div className={classes.Backdrop} onClick={()=>closeModal(notes.modalContent.showModal ? 0 : 1)}/>
            {createPath.showModal && <CreateModal index={createPath.index} creatModal={createSubPath} />}
            {notes.modalContent.showModal && <NotesModal data={{topic: null, content: null}} />}
        </div>
      }
      <div className={classes.Info}>
        
        <h3>{roadmap.title}</h3>
        <div className={classes.Sec}>
          <label>description</label>
          <p>{roadmap.description}</p>
        </div>
        <div className={classes.Sec}>
          <label>Start</label>
          <p>{roadmap.start}</p>
        </div>
        <div className={classes.Sec}>
          <label>Tags</label>
          <ul>
            {roadmap.tags.length ? roadmap.tags.map((tag, index) => {
              return <li key={index}>{tag}</li>
            })
          : <li>No tags</li>}
          </ul>
        </div>

        <div className={classes.Sec}>
          <label>Notes</label>
          <div className={classes.Notes}>
              <List component="nav" aria-label="secondary mailbox folder">
              {notes.data && notes.data.map((note, ind) => {
                return <ListItemButton onClick={()=>viewNoteModal(note._id)} style={{ width: '100%', display: "flex", justifyContent: "space-between" }} selected={1} >
                    <p className="cont">{note.title}</p> <p className="cont">{note.date}</p>
                </ListItemButton>
                })}
                
              </List>
          </div>
            
        </div>
        
      </div>
      
      <div className={classes.Main}>
          
          <div className={classes.StartDiv}>
            Starting Placement Roadmap
          </div>
        {
          roadmap.path.map((path, index) => {
            return <>
              <div className={classes.path}/>
              <div className={classes.Topics}>

                <p className={classes.title}>{path.topic}</p>
                
                <div className={classes.Box}>

                    <Stepper activeStep={1} alternativeLabel>
                      {path.subpath.map((sub, ind) => {
                        return <Step key={ind}>
                          <StepLabel >{sub.topic}</StepLabel>
                        </Step>
                      })}
                    </Stepper>
                  
                </div>
              
              </div>
            </>
          })
        }

        {/* adding more paths */}
        <div className={classes.path}/>
        <div className={classes.Topics}>

          <p className={classes.title}>
            <TextField onChange={(e) => { setCreatePath(prev => ({ ...prev, topic: e.target.value==="" ? null : e.target.value})) }} required size='small' id="standard-basic" label="Topic" variant="standard" value={createPath.topic || ""}/>
          </p>
          
          <div className={classes.Box}>
              <Stepper activeStep={0} alternativeLabel>
                {createPath.data.map((sub, ind) => {
                  return <Step key={ind}>
                    <StepLabel >{sub.topic}</StepLabel>
                  </Step>
                })}
              </Stepper>
          </div>
              <IconButton onClick={addHandler} size="large" color="primary" aria-label="add">
                <AddBoxIcon />
              </IconButton>
          
          <Button onClick={createPathHandler} style={{margin: "0 5px 0 0"}} disabled={(!createPath.topic || !createPath.data.length)} variant="contained" size="small">Create</Button>
          <Button onClick={removeLast} disabled={!createPath.data.length} variant="contained" size="small">Pop</Button>
          
        </div>
              
        </div>

    </div>
  );
}

export default Roadmap;



////------------create modals component------------

const CreateModal = (props) => {

  const [data, setData] = useState({
    index: props.index,
    topic: null,
    description: null,
    material: [],
  })
  const [material, setMaterial] = useState(null);

  const createHandler = () => {
    props.creatModal(data);
  }

  const addMaterial = () => {
    if (material != null && material != "") {
      setData(prev => ({
        ...prev,
        material: [...prev.material, material]
      }))
      setMaterial(null)
    }
  }

  const onChangeHandler = (e) => {
    if (e.target.name == "material") {
      setMaterial(e.target.value)
      return;
    }
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className={classes.CreateModal}>
      <div className={classes.head}>
        <label>Create Subtopic</label>
        <p>Step {props.index+1}</p>
      </div>
      <TextField required onChange={onChangeHandler} value={data.topic || ""} style={{margin: "10px 0"}} size='small' id="standard-basic" label="Subtopic" name="topic" variant="outlined" />
      <TextField
         style={{margin: "10px 0"}}
        id="outlined-multiline-static"
        label="Description"
        name="description"
        multiline
        rows={4}
        onChange={onChangeHandler}
        value={data.description || ""}
      />
      <div className={classes.material}>
        <TextField onChange={onChangeHandler} value={material || ""} style={{ margin: "10px 0" }} size='small' id="standard-basic" label="Material" name="material" variant="outlined" />
        <IconButton onClick={addMaterial} style={{ margin: "10px 0" }} size="small" color="primary" aria-label="add">
          <AddBoxIcon />
        </IconButton>
        <div className={classes.box}>
          {data.material.length ? data.material.map((mate, index) => {
            return <li key={index}>{mate}</li>
          }) : null}
        </div>
        
      </div>
      <Button onClick={createHandler} disabled={!data.topic} variant="contained" size="small">Create</Button>
    
    </div>
  )
}


//This component may use HTML formatting for its content
const NotesModal = (props) => {

  const [note, setNote] = useState({
    note: null,
    content: null,
  })

  useEffect(() => {
    
    setNote({
      topic: props.data.topic || "",
      content: props.data.content || "",
    })

  }, [])

  return (
    <div className={classes.NotesModal}>
      <div className={classes.head}>
        Topic
      </div>
      <div className={classes.content}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </div>
    </div>
  )
}