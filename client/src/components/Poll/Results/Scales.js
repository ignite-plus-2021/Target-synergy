import React,{useEffect,useState } from 'react'
import { Bar } from 'react-chartjs-2';
import axios from "axios";
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import randomColor from 'randomcolor'

const useStyles = makeStyles((theme) => ({
  disabled: {
    color: randomColor({luminosity: 'bright'})
  },
  root: {
    width: '100%',
    
  },

  margin: {
    height: theme.spacing('100%'),
  },

}));



const Scales =(props) => {
  const classes = useStyles();
  const [Background, setBackground]=useState({
    bgcolor: 'white',
    textcolor: 'black',
    opacity: 100,
  })
  const url =props.match.params.id;
  const [textBased , setTextBased] = useState({question:'', choices:[]})
  useEffect(async () => {
    var result = await axios.get(`http://localhost:8080/SC/${url}`)
    setTextBased({
      question: result.data.question,
     choices: result.data.choices
      
    })
    const update={...Background, 
      bgcolor: result.data.bg.bgColor,
       textcolor: result.data.bg.textColor,
       opacity: result.data.opacity
    }
    setBackground(update)
  },[])

  return (
    <div>
    <div style={{
     backgroundColor: Background.bgcolor,
     opacity:  Background.opacity,
     color: Background.textcolor,
     width: '60%',
     height:'100%',
     margin:"auto"}}>
    <div  style={{display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '60vh',paddingTop:"5%"}} ><h1 fontFamily= "Helvetica">{textBased.question}</h1>
           
      
{textBased.choices.map((x, i) => {
  const PrettoSlider = withStyles({
    root: {
      color: randomColor(),
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);
 
    return(
        <div style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      
          <h4>{x.option}</h4>
          <div className={classes.margin} />
      
      <PrettoSlider valueLabelDisplay="on" aria-label="pretto slider" defaultValue={x.votes} />
       
          
</div>

           

        );
      })}
      </div>
      </div>
      </div>
    );
  }
export default Scales