import React from 'react'

//component
import {GET_FULL_MONTH} from "../MainCalendar" 

//classes
import classes from "./DayBox.css"

const DayBox = (props) => {

    let DayBoxClassList = [classes.DayBox]
    if(props.selected){
        if(props.current){
            DayBoxClassList.push(classes.DayBox_current_selected)
            DayBoxClassList.push(classes.DayBox_current)
        }else{
            DayBoxClassList.push(classes.DayBox_selected)
        }
    }else if(props.current){
        DayBoxClassList.push(classes.DayBox_current)
    }else{
        DayBoxClassList.push(classes.DayBox_default)
    }

    let EventClassList = [classes.EventSym]
    
    if(props.event){    
        if(props.current){
            EventClassList.push(classes.EventSym_current)   
        }else{
            EventClassList.push(classes.EventSym_default)   
        }
    }else{
        EventClassList = []
    }

    let boxStyle = {
        height: "40px",
        width: "40px"
    }
    if(props.Month){
        boxStyle = {
            height: "70px",
            width: "70px",
            fontSize: "0.8rem"
        }
    }
    else if(props.Year){
        boxStyle = {
            height: "70px",
            width: "70px"
        }
    }
    // console.log(props.fade)
    return (
        <div onClick={()=>props.selectClick(props.dateValue)} className={DayBoxClassList.join(" ")} style={{color: props.fade && "#cacaca", ...boxStyle}}>
            {props.Month ? GET_FULL_MONTH(props.dateValue[1]) : props.dateValue[1] }
            <span className={EventClassList.join(" ")}></span>
        </div>
    )
}

export default DayBox
