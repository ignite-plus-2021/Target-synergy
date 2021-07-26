import React from "react";
import Sidebar from "./Sidebar";
import Presentation from "./Presentation";
import '../CreatePoll/CreatePolls.css'
import Button from '@material-ui/core/Button';
import { Link,useHistory } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


export const typee=[
    { id: 1, label: 'multiplechoice', checked: false },
    { id: 2, label: 'imagechoise', checked: false },
    { id: 3, label: 'openended', checked: false },
    { id: 4, label: 'wordcloud', checked: false },
   ];
  function CreatePolls() {
    let history = useHistory();
    function handleClick(path) {
       history.push(path);
       
   }
   const [color, setColor] = React.useState('white'); //for background color change in presentation component
   const [isVisible, setIsVisible] = React.useState(true); // to show and hide type(of sidebar) component in presentation
   const toggleVisibility = () => setIsVisible(!isVisible);
  
    return (
        <div className= 'CreatePolls'>
  <div className = 'Navbar' style={{
    overflow: 'hidden'
    
  }}> 
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" style={{float: 'left' , margin: "10px" }}>
            
            <Link to="/" style={{color:"black", textDecoration:"none" }} >
            <Typography style={{fontSize:"20px"}}> Services</Typography>
            </Link>
            <Link to="/polls" style={{color:"black", textDecoration:"none" }} >
            <Typography style={{fontSize:"20px"}}>Polls</Typography>
            </Link>
            <Typography style={{fontSize:"20px"}}>
                  Design
            </Typography>
           </Breadcrumbs> 
           <Button
                    variant="contained"
                    onClick={() => {handleClick("/link") }}
                             style={
                                 {
                                            backgroundColor: "#cc0000",
                                            color: "white",
                                            float: "right",
                                            marginRight: "25px",
                                            border: "1px solid white",
                                            margin: "10px 3px",
                                            
                                        }
                                    }
                                >Create Link
                            </Button>                     
                            </div> 
     
       
<div className='Designarea' style={{
    overflow: 'hidden',
    marginTop: -30
}}>
     <Sidebar state={color} parentCallback={setColor} isVisible={isVisible} toggleVisibility={toggleVisibility}
     style={{
         float: 'left'
     }}/>
     <Presentation style={
         {position: "relative",
         float: "right",
        }
     } color={color} isVisible={isVisible}/>
     
     </div>
    </div>
    
    )
}

export default CreatePolls