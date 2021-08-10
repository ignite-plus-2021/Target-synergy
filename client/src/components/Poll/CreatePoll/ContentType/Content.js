import React,{useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import { Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid } from '@material-ui/core';
import { IdContext } from '../../../../IdContext';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
      
      },
    },
    h:{
      fontSize: '15px',
      marginBottom: '0',

    },
    typography: {
        // for settings
        fontSize: 12,
      },
    button: {
        margin: theme.spacing(1),
        borderRadius: "2em",
        
      },
    addicon: {
        color: 'solid white',
    },
}));

const Content = ({setData1,data1, setResult, result}) => {
     const [state, setState] = React.useState({
         checkedA: false,
         checkedB: false,
         checkedC: false,
      });
    
      const [inputList, setInputList] = useState([{ choice: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    
  };
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    const r = [...result];
    console.log(result);
    r.splice(index, 1);
    setResult(r);
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { choice: "" }]);
    setResult([...result, { distance: 0, colors: ["#ffd847", "#e0a106"], text: "" }]);
  };
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    
    const classes = useStyles();
    const url="http://localhost:8080/mcq"
  
    const id = useContext(IdContext);
    const submit = (e) => {

      e.preventDefault();
      inputList.map((choicee,key)=>{
        data1.choice[key]=choicee.choice
      })
  
      const q ={
        question: data1.question,
       choices: data1.choice
      }
      console.log(q)
      axios.post(url, q)
           .then(res=>{
              console.log(res)
              id.setId(res.data1);
              console.log(id.id);
            })

    }


    function handle(e){
      const newdata={...data1}
      newdata[e.target.id]=e.target.value
      setData1(newdata)
      console.log(newdata)

    }


    return (
      <div >
          <form onSubmit={submit} className={classes.root} noValidate autoComplete="off"><h4 className={classes.h}>Your Question</h4>
      
     
        <TextField id="outlined-basic" label="Your multiple choice question" variant="outlined" size="small" onChange={(e)=>handle(e)} id="question" value={data1.question} type="text" style={{width: '100%'}} />
        <h4 className={classes.h}>Options</h4>
        <Grid container={true}  direction="row"  alignItems="center" 
>
{inputList.map((x, i) => {
        return (
          <div >
          
            <TextField
            id="outlined-basic"
            variant="outlined" size="small"
            id="outlined-basic"
            style={{width: '100%'}}
              className="ml10"
              name="choice"
   placeholder="Enter choice"
              value={x.choice}
              onChange={e => handleInputChange(e, i)}
            />
            <div>
              {inputList.length !== 1 && <DeleteIcon style={{background:"#C0C0C0", color:"white", marginRight:"3px"}}
                className="mr10"
                onClick={() => handleRemoveClick(i)}/>}
              {inputList.length - 1 === i && <AddIcon style={{background:"#C0C0C0", color:"white"}} onClick={handleAddClick} className={classes.addicon} />}
            </div>
          </div>
        );
      })}
    
      </Grid>  <Button
        style={{ width: "235px",background:"#cc0000", color:"white" }}
        className={classes.button}
        variant="contained"
       // color="primary"
        size="large"
        fullWidth={true}
        onClick={submit}
      >Submit
      </Button>
  
        <h4 className={classes.h}>Other Settings</h4>
        <FormGroup row >
         <FormControlLabel
         control={
           <Checkbox
             checked={state.checkedA}
             onChange={handleChange}
             name="checkedA"
             color="primary"
           />
         }
         label={<Typography className={classes.typography} color="textSecondary">Allow picking more than one options</Typography>}
       />
       <FormControlLabel
         control={
           <Checkbox
             checked={state.checkedB}
             onChange={handleChange}
             name="checkedB"
             color="primary"
           />
         }
         label={<Typography className={classes.typography} color="textSecondary">This question has correct answer(s)</Typography>}
       />
       <FormControlLabel
         control={
           <Checkbox
             checked={state.checkedC}
             onChange={handleChange}
             name="checkedC"
             color="primary"
           />
         }
         label={<Typography className={classes.typography} color="textSecondary">Hide Results</Typography>}
       />
       </FormGroup>
       
       </form>
      </div>
      
    );
}



export default Content