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
];


const Roadmap =(props)=> {



  return (
    <div className={classes.Roadmap}>

        <div className={classes.Box}>
        <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
                <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>
            ))}
        </Stepper>
        </div>

    </div>
  );
}

export default Roadmap;