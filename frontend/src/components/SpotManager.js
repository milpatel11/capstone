import React, { useState, useReducer } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  FormGroup,
  FormControlLabel,
  Switch,
  Slider,
  Backdrop,
} from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

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
  margin: {
    margin: theme.spacing(1),
  },
  backdrop: {
    zIndex: 9999,
    color: "#fff",
  },
}));

const GET_PARKINGSPOT = gql`
  query {
    getParkingSpots(parkingSpotInput: {}) {
      obj {
        id
        name
        available
        cost
        status
      }
      message
      error
    }
  }
`;

const ADD_PARKINGSPOT = gql`
  mutation CreateParkingSpot(
    $name: String!
    $available: Boolean!
    $cost: Int!
    $status: Boolean!
  ) {
    createParkingSpot(
      parkingSpotInput: {
        name: $name
        available: $available
        cost: $cost
        status: $status
      }
    ) {
      obj {
        name
        available
        cost
        status
      }
      message
      error
    }
  }
`;

const UPDATE_PARKINGSPOT = gql`
  mutation UpdateParkingSpot(
    $id: ID!
    $name: String!
    $available: Boolean!
    $cost: Int!
    $status: Boolean!
  ) {
    updateParkingSpot(
      parkingSpotInput: {
        id: $id
        name: $name
        available: $available
        cost: $cost
        status: $status
      }
    ) {
      obj {
        name
        available
        cost
        status
      }
      message
      error
    }
  }
`;

const DELETE_PARKINGSPOT = gql`
  mutation DeleteParkingSpot($id: ID!) {
    deleteParkingSpot(parkingSpotInput: { id: $id }) {
      obj {
        name
        available
        cost
        status
      }
      message
      error
    }
  }
`;

export default function SpotManager() {
  const classes = useStyles();

  const { loading, error, data, refetch } = useQuery(GET_PARKINGSPOT);
  const [addParkingSpot] = useMutation(ADD_PARKINGSPOT);
  const [updateParkingSpot] = useMutation(UPDATE_PARKINGSPOT);
  const [deleteParkingSpot] = useMutation(DELETE_PARKINGSPOT);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add"); // add | edit
  const [dimmer, setDimmer] = useState(false);

  // form fields
  const [hiddenIDField, setHiddenIDField] = useState("");
  const [nameField, setNameField] = useState("");
  const [availableField, setAvailableField] = useState(false);
  const [costField, setCostField] = useState(0);
  const [statusField, setStatusField] = useState(false);

  const setAddModal = () => {
    setModalOpen(true);
    setModalType("add");
    setHiddenIDField("");
    setNameField("");
    setAvailableField(false);
    setCostField(0);
    setStatusField(false);
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={dimmer} onClick={() => {}}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <NavBar setAddModal={setAddModal} refreshPage={refetch} />
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Slot Name</TableCell>
              <TableCell align="center">Cost</TableCell>
              <TableCell align="center">Availability</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}

            {data &&
              data.getParkingSpots.obj.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      {item.name.toUpperCase()}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.cost} Units
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.available ? "Available" : "Occupied"}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.status ? "Ready" : "Not Ready"}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <IconButton
                        aria-label="edit"
                        className={classes.margin}
                        onClick={(ev) => {
                          setModalOpen(true);
                          setModalType("edit");
                          setHiddenIDField(item.id);
                          setNameField(item.name);
                          setAvailableField(item.available);
                          setCostField(item.cost);
                          setStatusField(item.status);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        className={classes.margin}
                        onClick={() => {
                          setDimmer(true);
                          deleteParkingSpot({
                            variables: {
                              id: hiddenIDField,
                            },
                          }).then(() => {
                            setTimeout(() => {
                              refetch();
                              setDimmer(false);
                            }, 1000);
                          });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {modalType === "add" ? "Add Form" : "Edit Form"}
        </DialogTitle>
        <DialogContent>
          <input hidden value={hiddenIDField}></input>

          <TextField
            margin="dense"
            name="name"
            value={nameField}
            onChange={(e) => {
              setNameField(e.target.value);
            }}
            label="Name"
            // type="email"
            fullWidth
          />

          {/* <TextField
            margin="dense"
            name="available"
            value={availableField}
            onChange={(e) => {
              setAvailableField(e.target.value);
            }}
            label="Available"
            // type="email"
            fullWidth
          /> */}

          <Typography
            id="discrete-slider"
            className={classes.root}
            gutterBottom
          >
            Cost
          </Typography>
          <Slider
            value={costField}
            onChange={(ev, val) => {
              setCostField(val);
            }}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            marks
            step={5}
            min={5}
            max={100}
          />

          {/* <TextField
            margin="dense"
            name="cost"
            value={costField}
            onChange={(e) => {
              setCostField(e.target.value);
            }}
            label="Cost"
            // type="email"
            fullWidth
          /> */}

          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="top"
              control={
                <Switch
                  color="primary"
                  checked={availableField}
                  onChange={() => {
                    setAvailableField(!availableField);
                  }}
                />
              }
              label="Available"
              labelPlacement="top"
            />
            <FormControlLabel
              value="top"
              control={
                <Switch
                  color="primary"
                  checked={statusField}
                  onChange={() => {
                    setStatusField(!statusField);
                  }}
                />
              }
              label="Status"
              labelPlacement="top"
            />
          </FormGroup>

          {/* <FormGroup>
              <FormControlLabel
                control={<Switch size="small" checked={checked} onChange={toggleChecked} />}
                label="Small"
              />
              <FormControlLabel
                control={<Switch checked={checked} onChange={toggleChecked} />}
                label="Normal"
              />
            </FormGroup>

        <FormControl component="fieldset">
          <FormLabel component="legend">Available</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
            <FormControlLabel value="true" control={<Radio />} label="Female" />
            <FormControlLabel value="false" control={<Radio />} label="Male" />
            <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
          </RadioGroup>
        </FormControl> */}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setModalOpen(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (modalType === "add") {
                setDimmer(true);
                addParkingSpot({
                  variables: {
                    name: nameField,
                    available: availableField,
                    cost: costField,
                    status: statusField,
                  },
                }).then(() => {
                  setTimeout(() => {
                    refetch();
                    setDimmer(false);
                  }, 1000);
                });
              }

              if (modalType === "edit") {
                setDimmer(true);
                updateParkingSpot({
                  variables: {
                    id: hiddenIDField,
                    name: nameField,
                    available: availableField,
                    cost: costField,
                    status: statusField,
                  },
                }).then(() => {
                  setTimeout(() => {
                    refetch();
                    setDimmer(false);
                  }, 1000);
                });
              }

              setModalOpen(false);
            }}
            color="primary"
            autoFocus
          >
            {modalType === "add" ? "Add" : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function NavBar({ setAddModal, refreshPage }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  // const handleClickOpen = () => {
  //   setOpen(false);
  // };
  // const handleClose = () => {
  //   setOpen(true);
  // };

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
          <Button color="inherit" onClick={refreshPage}>
            Refresh
          </Button>
          <Button color="inherit" onClick={setAddModal}>
            Add Spot
          </Button>
        </Toolbar>
      </AppBar>
      {/* <Dialog
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
              <Grid item xs={12}>
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
      </Dialog> */}
    </>
  );
}
