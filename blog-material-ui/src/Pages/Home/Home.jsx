import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Post from "../../components/Home/Post/Post";
import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from "@mui/material/CircularProgress";
import requests from "./../../apis/posts/requests"
import { AuthContext } from "./../../context/Store";
import Search from "../../components/Utility/Search/Search.jsx";
const useStyles = makeStyles({
  root: {
    // backgroundColor: "gray",
    margin: "10px auto",
    maxWidth: "90%",
    padding: "0.5rem",
  },
  main: {
    // backgroundColor: "lightblue",
    padding: "2rem",
  },
  search: {
    backgroundColor: "#ddd",
    padding: "2rem",
  },
  pagination:{
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
  }
});
const Home = (props) => {
  const classes = useStyles(props);
  const [posts,setposts] = useState([])
  const [page,setpage] = useState(1)
  const [noOfpage,setNoOfpage] = useState(1)
  const {Userdata} = useContext(AuthContext)
  useEffect(() => {

    const FetchPosts = async(page)=>{
      const dataFetch = await requests.getAll(page);
      const {data , UserPage ,pagesCount} = dataFetch;
    console.log(pagesCount,data,UserPage);
      setposts(data);
      setNoOfpage(pagesCount);
      setpage(UserPage)
    }
    FetchPosts(page );
      }, [page ])
     
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));


  return (
    <>
      <Paper sx={{ maxWidth: "90%", m: "10px auto", p: 2 }}>

      <Grid
          container
          className={classes.root}
          justifyContent="space-between"
          direction={matches ? "column" : "row"}
        >
                <Grid
          container
          
          justifyContent="space-between"
          direction={matches ? "column" : "row"}
        >
          <Grid item>
          {(Userdata?.role === "admin" || Userdata?.id) &&
                   <>
                   <Button
                     variant="contained"
                     color="primary"
                     sx={{
                       display: { sm: "block" },
                    
                     }}
                   >
                     <MuiLink
                       component={Link}
                       to="/add-post"
                       variant="button"
                       underline="none"
                       color="inherit"
                     >
                       Add_POST
                     </MuiLink>
                   </Button>
       
       
                         </>
          
          }
          </Grid>
                <Search/>

        </Grid>

          <Grid item container className={classes.main}>
          {posts && posts.length > 0 ? (
              posts.map((post,index) => {
                return (
            <Grid item md={4} key={index}>
              <Post 
              
              
              snippet

              id={post._id}
              title={post.title}
              content={post.body}
              
              />
            </Grid>
                  );
                })
          ) : (
            <CircularProgress size={120} />
          )}

          </Grid>
        </Grid>
        <Grid item xs={12} >

<Stack spacing={2} className={classes.pagination}>
    
      <Pagination 
      count={noOfpage} 
      variant="outlined"
      defaultPage={1}
       color="primary" 
       shape='rounded'
       onChange={(e,value)=> setpage(value)} />

    </Stack>

</Grid>
      </Paper>

     
    </>
  );
};

export default Home;
