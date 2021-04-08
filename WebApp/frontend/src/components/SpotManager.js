import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 10,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    table: {
        minWidth: 650,
        alignItems: "center",
    },
}));

export default function SpotManager() {
  const classes = useStyles();

  // let SPOTS = [];
  // const { loading, data } = useQuery();

  // if (data) {
  //     SPOTS = data["getParkingSports"];
  // }
 
  return (
      <>
          <NavBar />
          <TableContainer component={Paper}>
              <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
              >
                  <TableHead>
                      <TableRow>
                          <TableCell align="center">Slot Name</TableCell>

                          <TableCell align="center">Status</TableCell>
                      </TableRow>
                  </TableHead>

                  <TableBody>
                      {/* {SPOTS.map((spot) => {
                          return (
                              <TableRow key={spot.id}>
                                  <TableCell component="th" scope="row">
                                      <TextField
                                          id="standard-basic"
                                          value={spot.parkingsportname}
                                      />
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                      <TextField
                                          id="standard-basic"
                                          value={spot.isActive}
                                      />
                                  </TableCell>
                              </TableRow>
                          );
                      })} */}
                  </TableBody>
              </Table>
          </TableContainer>
      </>
  );
}



// const uery=()=>{
//   const ADD_SPOT = gql`
//   mutation createParkingSport(
//       $parkingsportname: String!
//       $avalible: Boolean!
//   ) {
//       createParkingSport(
//           createParkingSportInput: {
//               parkingsportname: $parkingsportname
//               avalible: true
//           }
//       )
//   }
// `;
// const [addSpot,loading] =  useMutation(ADD_SPOT,{
//   update(proxy, result){
//     console.log(result)
//   },
//   variables:{
//     parkingsportname: spotName
//   }
// })




// return (addSpot)? true:false;
// }

function NavBar() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(true);
  };
  
  
  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={classes.title}>
            Spot Manager
          </Typography>
          <Button color="inherit" onClick={handleClickOpen}>
            Add Spot
          </Button>
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Parking Spot</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Fill out The Details Carefully.
          </DialogContentText>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="Spot Name"
                  name="spotname"
                  
                  variant="outlined"
                  required
                  fullWidth
                  id="spotname"
                  //value={spotName}
                  label="Spot Name"
                  autoFocus
                  //onChange={(e) => setSpotName(e.target.value)}
                  />
                 
                  
                
              </Grid>
              
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
