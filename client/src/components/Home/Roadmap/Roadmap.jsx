import React from 'react';

//component
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

//classes
import classes from "./Roadmap.css";


const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
  'Create an ad',
  'Create an ad',
  'Create an ad',
  'Create an ad',
  'Create an ad',
  'Create an ad',
  'Create an ad',
];

const roadmap = [{
  title: "Placement",
  description: "This is the discription about the placement!",
  start: new Date(),
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
  ],
  tags: ["tag", "tag", "tag"],
  // private: { type: Boolean, default: false },
}]


const Roadmap =(props)=> {



  return (
    <div className={classes.Roadmap}>

        <div className={classes.Header}>
          <p className={classes.title}>Placement</p>
        </div>

        <div className={classes.Main}>
          <div className={classes.StartDiv}>
            Starting Placement Roadmap
          </div>
          <div className={classes.path}/>
          <div className={classes.Topics}>

            <p className={classes.title}>Data Structrue</p>
            
            <div className={classes.Box}>
              <Stepper activeStep={1} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel style={{width: "100px"}}>{label}</StepLabel>
                    </Step>
                  ))}
              </Stepper>
            </div>
          
          </div>

        </div>
    </div>
  );
}

export default Roadmap;