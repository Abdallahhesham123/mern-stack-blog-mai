import React, { useContext } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import MuiLink from "@mui/material/Link";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../../context/Store";
// import FeaturedPost from './../FeaturedPost/FeaturedPost';
import Controls from '../../Utility/controls/Controls';
const useStyles = makeStyles({

  root:{
marginBottom:"16px",
textAlign:"center",
marginRight:"1rem",


  },
  image:{
    width:"200px"
    , height:"150px" ,
     margin:" 20px auto" , 
    

  }
})
const Post = (props) => {
  const classes = useStyles(props)
    const {Userdata} = useContext(AuthContext)
  const {id,title, content ,snippet ,userId}= props;
  return (
    <>
  

<Card raised className={classes.root}>
{snippet  ? <></>:

<>
{

((userId=== Userdata.id) || Userdata.role === "admin")&& (<Controls postID={id} user_id={userId} user_name={Userdata.name}/>)
}


</>

}

  <CardContent>
  {/* <CardMedia
 className={classes.image}
  image="http://via.placeholder.com/150/FF0000/FFFFFF"
  title="green iguana"
/> */}
  <Typography gutterBottom variant="h6" component="h3">
  {snippet ? title.slice(0, 16) : title}
  </Typography>
  <Typography gutterBottom variant="body1" component="p">
  {snippet ? content.slice(0, 70) : content}
  </Typography>
  </CardContent>
  {snippet && (
  <CardActions>
  <Button variant="contained" fullWidth>
          <MuiLink
            color="inherit"
            component={Link}
            to={`/post/${id}`}
            variant="button"
            underline="none"
          >
            Read More
          </MuiLink>
        </Button>
</CardActions>


  )}

</Card>


   

    
    </>

  )
}

export default Post