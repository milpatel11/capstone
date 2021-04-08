import React, { useState } from "react";

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
} from "@material-ui/core";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
}));

export default function UserManager() {
  const classes = useStyles();

  let USERS = [];
  const { loading, data } = useQuery(FETCH_USERS_QUERY);

  if (data) {
    USERS = data["getUsers"];
  }

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
              <TableCell>First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Mobile No</TableCell>
              <TableCell align="center">Admin</TableCell>
              <TableCell align="center">Update</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {USERS.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    <TextField id="standard-basic" value={user.firstname} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField id="standard-basic" value={user.lastname} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField id="standard-basic" value={user.email} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField id="standard-basic" value={user.phonenumber} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField id="standard-basic" value="" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const FETCH_USERS_QUERY = gql`
  query {
    getUsers {
      id
      firstname
      lastname
      email
      password
      phonenumber
    }
  }
`;

function NavBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {};

  const [f, setF] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cPasswrod, setCPassword] = useState();
  const [mobile, setMobile] = useState();

  const ADD_USER = gql`
    mutation {
      createUser(
        userInput: {
          firstname: f
          lastname: lastname
          email: email
          password: password
          phonenumber: mobile
        }
      ) {
        id
        firstname
        lastname
        email
        password
        phonenumber
      }
    }
  `;
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
            User Manager
          </Typography>
          <Button color="inherit" onClick={() => handleClickOpen()}>
            Add User
          </Button>
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Fill out The Details Carefully.
          </DialogContentText>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(text) => setLastname(text)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(text) => setEmail(text)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile Number"
                  type="number"
                  name="mobile"
                  autoComplete="mobile"
                  onChange={(text) => setMobile(text)}
                />
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(text) => setPassword(text)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password_confirm"
                  label="Confirm Passsword"
                  type="password"
                  id="password_confirm"
                  autoComplete="current-password"
                  onChange={(text) => setCPassword(text)}
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

function validateEmail(email) {
  const re = /^[-!#$%&'+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'+\/0-9=?A-Z^_a-z`{|}~])@[a-zA-Z0-9](-\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  console.log(re.test(String(email).toLowerCase()));
  return re.test(String(email).toLowerCase());
}
function validatePassword(text, text1) {
  return text === text1;
}
function validateMobile(text) {
  return text.match(/^(\+\d{1,3}[- ]?)?\d{10}$/);
}

function validateForm(email, password, cpassword, mobile) {
  return validateEmail(email)
    ? validatePassword(password, cpassword)
      ? validateMobile(mobile)
        ? "Successfully Registered"
        : "Invalid Mobile Number"
      : "Password Mismatch\n"
    : "Invalid Email\n";
}

// function register(first, last, email, password, mobile,cpassword, ) {
//   (validateForm(email, password, cpassword, mobile) )? : ;
// }
