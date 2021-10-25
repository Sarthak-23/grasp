import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router';

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
import RightPanel from '../RightPanel/RightPanel';

const date = new Date()

const Roadmap = (props) => {
  
  const params = useParams();
  const [user, setUser] = useContext(UserContext) // {id, username, name, goals, connnections, pending, recieve}

  const [roadmap, setRoadmap] = useState([])
  const [createPath, setCreatePath] = useState({ topic: null, data: [], showModal: false, index: 0 })

  const [loader, setLoader] = useState(null)
  const [error, setErrors] = useState(null)
  

  const [notes, setNotes] = useState([])
  const [noteData, setNoteData] = useState(null)

  const [showCreateModal, setShowCreateModal] = useState(false)

  const [selectedTopic, setSelectedTopic] = useState(null)

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
          console.log(res);
          setRoadmap({
            ...res,
            createdAt: convertDate(res.createdAt),
            updatedAt: convertDate(res.createdAt)
          });
            // history.replace('/');
            setErrors('');
        } else {
            setErrors(res || res.error);
        }
    } catch (e) {
        setLoader(false);
        setErrors('Something went wrong');
    }

    // Setting notes from database;
    try {
      let res = await fetch(`/roadmaps/${params.id}/notes/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res = await res.json();
      console.log(res);
      if (res.length) {
        setNotes(res)
      }
    
    } catch (e) {
      setLoader(false);
      setErrors('Something went wrong');
    }

  }, [showCreateModal, selectedTopic])


  const getNoteData = async(note_id) => {
    //requesting for data
    try {
      let res = await fetch(`/roadmaps/notes/${note_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res = await res.json();

      if (res._id) {
        console.log(res);
        setNoteData(res);
        // history.replace('/');
        setErrors('');
      } else {
        setErrors(res || res.error);
      }
    } catch (e) {
      setLoader(false);
      setErrors('Something went wrong');
    }
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

    setNoteData(null)
    setShowCreateModal(false)
    
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


  // createdAt: "24 October, 2021"
  // description: "NO description"-
  // parent: null
  // path: []
  // private: false
  // start: "2021-10-24T16:19:07.140Z"
  // tags: ['NO']
  // title: "First Roadmap"
  // updatedAt: "24 October, 2021"
  // user: "6175086df8261f96296cfb75"
  // __v: 0
  // _id: "61758817805c7aedcda6a950"

  const createPathHandler = async () => {
    console.log(roadmap)
    try {
      let res = await fetch(`/roadmaps/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...roadmap,
          path: [
            ...roadmap.path,
            {
              index: roadmap.path.length,
              topic: createPath.topic,
              subpath: createPath.data
            }
          ]
        })
      });
      res = await res.json();
      console.log(res);

      if (res._id) {
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

    setRoadmap(prev => ({
      ...prev,
      path: [
        ...prev.path,
        {
          index: roadmap.path.length,
          topic: createPath.topic,
          subpath: createPath.data
        }
      ]
    }))
    setCreatePath({topic: null, data: [], showModal: false, index: 0})
  }

  const createNote = async (newNote) => {
    console.log(params.id)
    try {
      let res = await fetch(`/roadmaps/${params.id}/notes/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newNote.title,
          content: newNote.content,
        })
      });
      res = await res.json();
      console.log(res);
      setShowCreateModal(false)

    } catch (e) {
      setLoader(false);
      setErrors('Something went wrong');
    }
  }

  const subtopicUpdateHandler = async (data, index, ind) => {
    
    let oldPath = JSON.parse(JSON.stringify(roadmap.path));
    console.log(oldPath)
    oldPath[index].subpath[ind] = {
      ...oldPath[index].subpath[ind],
      description: data.description,
      materials: data.materials,
    }
    
    try {
      let res = await fetch(`/roadmaps/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...roadmap,
          path: oldPath
        })
      });
      res = await res.json();
      console.log(res);
      setRoadmap({
        ...roadmap,
        path: oldPath
      })
      setSelectedTopic(null)
      if (res._id) {
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
  }

  return (
    <div className={classes.Roadmap}>
      {(createPath.showModal || noteData || showCreateModal) &&
        <div className={classes.Modal}>
        <div className={classes.Backdrop} onClick={() => closeModal(notes.showCreateModal ? 0 : 1)}/>
            {createPath.showModal && <CreateModal index={createPath.index} creatModal={createSubPath} />}
            {noteData && <NotesModal data={noteData} />}
            {showCreateModal && <CreateNotes create={createNote}/>}
        </div>
      }
      <div className={classes.Info}>
        
        <h3>{roadmap.title}</h3>
        <div className={classes.Sec}>
          <label>description</label>
          <p>{roadmap.description}</p>
        </div>
        <div className={classes.Sec}>
          <label>Create on</label>
          <p>{roadmap.createdAt}</p>
        </div>
        <div className={classes.Sec}>
          <label>Last Update</label>
          <p>{roadmap.updatedAt}</p>
        </div>
        <div className={classes.Sec}>
          <label>Tags</label>
          <ul>
            {roadmap.tags ? roadmap.tags.map((tag, index) => {
              return <li key={index}>{tag}</li>
            })
          : <li>No tags</li>}
          </ul>
        </div>

        <div className={classes.Sec}>
          <label>Notes</label>
          <div className={classes.Notes}>
              <List component="nav" aria-label="secondary mailbox folder">
              {notes && notes.map((note, ind) => {
                return <ListItemButton key={ind} onClick={()=>getNoteData(note._id)} style={{ width: '100%', display: "flex", justifyContent: "space-between" }} selected={1} >
                    <p className="cont">{note.title}</p> <p className="cont">{convertDate(note.updatedAt)}</p>
                </ListItemButton>
                })}
                
              </List>
          </div>
            
        </div>
        <Button onClick={() => setShowCreateModal(true)}  variant="contained" startIcon={<AddBoxIcon color="white"/>}>
          Create
        </Button>

        
      </div>
      
      <div className={classes.Main}>
          
          <div className={classes.StartDiv}>
          Starting {roadmap && roadmap.title}
          </div>
        {roadmap.path && 
          roadmap.path.map((path, index) => {
            return <>
              <div className={classes.path}/>
              <div className={classes.Topics}>

                <p className={classes.title}>{path.topic}</p>
                
                <div className={classes.Box}>

                    <Stepper activeStep={1} alternativeLabel>
                      {path.subpath.map((sub, ind) => {
                        return <Step  onClick={() => setSelectedTopic({sub: sub, index: index, ind: ind})} key={ind}>
                          <StepLabel style={{ cursor: "pointer" }}>{sub.topic}</StepLabel>
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
                  return <Step  key={ind}>
                    <StepLabel>{sub.topic}</StepLabel>
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
      
      {selectedTopic && <RightPanel updateSubtopic={subtopicUpdateHandler} data={selectedTopic} />}

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

// ================ Notes ===================


const CreateNotes = (props) => {
  const [data, setData] = useState({
    title: null,
    content: null,
  })

  const createHandler = () => {
    console.log(data);
    // props.creatModal()
    props.create(data)
  }

  const onChangeHandler = (e) => {
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className={classes.CreateNoteModal}>
      <div className={classes.head}>
        <label>Create Notes</label>
      </div>
      <TextField required onChange={onChangeHandler} value={data.title || ""} style={{ margin: "10px 0" }} size='small' id="standard-basic" label="Title" name="title" variant="outlined" />
      <TextField
        style={{ margin: "10px 0" }}
        id="outlined-multiline-static"
        label="Content"
        name="content"
        multiline
        required
        rows={4}
        onChange={onChangeHandler}
        value={data.content || ""}
      />
      <Button onClick={createHandler} disabled={!(data.title && data.content)} variant="contained" size="small">Create</Button>

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
      title: props.data.title || "",
      content: props.data.content || "",
      createdAt: props.data.createdAt,
      updatedAt: props.data.updatedAt
    })

  }, [])

  return (
    <div className={classes.NotesModal}>
      <div className={classes.head}>
        {note.title}
      </div>
      <div className={classes.content}>
        {note.content}
      </div>
    </div>
  )
}


const convertDate = (date) => {
  let dates = date.split('T')[0]
  // let times = date.split('T')[1]
  // console.log(dates, times)
  let [year, month, day] = dates.split("-");
  console.log(year, month, day)
  return `${day} ${getMonth(month)}, ${year}`;
}

//No. to month
function getMonth(n) {
  switch (n) {
    case "1":
      return "January"
    case "2":
      return "February"
    case "3":
      return "March"
    case "4":
      return "April"
    case "5":
      return "May"
    case "6":
      return "June"
    case "7":
      return "July"
    case "8":
      return "August"
    case "9":
      return "September"
    case "10":
      return "October"
    case "11":
      return "November"
    case "12":
      return "December"
  }
}