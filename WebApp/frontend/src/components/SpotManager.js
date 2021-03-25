import React from "react";
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
import Select from "@material-ui/core/Select";

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
}));

export default function SpotManager() {
  //const classes = useStyles();
  return (
    <>
      <NavBar />
    </>
  );
}

function NavBar() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="Spot Number"
                  name="spotnumber"
                  type="number"
                  variant="outlined"
                  required
                  fullWidth
                  id="spotnumber"
                  label="spotnumber"
                  onChange={(event) =>
                    event.target.value < 0
                      ? (event.target.value = 0)
                      : event.target.value
                  }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12}>
                <Select
                  native
                  variant="outlined"
                  label="Slot"
                  value="Slot"
                  placeholder="Slot"
                  inputProps={{
                    name: "slot",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="Parking Slot" value="" />
                  <option value={101}>A</option>
                  <option value={202}>B</option>
                  <option value={303}>C</option>
                  <option value={404}>C</option>
                </Select>
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
