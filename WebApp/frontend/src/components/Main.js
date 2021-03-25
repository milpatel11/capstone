import React from "react";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Dashboard from "./Dashboard";
import UserManager from "./UserManager";
import SpotManager from "./SpotManager";
import Statistics from "./Statistics";
import RoomIcon from "@material-ui/icons/Room";
import Finance from "./Finance";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

//Navigation Container
const Home = (props) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Dashboard" icon={<DashboardIcon />} />
          <Tab label="User Manager" icon={<PeopleOutlineIcon />} />
          <Tab label="Spot Manager" icon={<RoomIcon />} />
          <Tab label="Statistics" icon={<EqualizerIcon />} />
          <Tab label="Finance" icon={<CreditCardIcon />} />
          <Tab label="Log Out" icon={<ExitToAppIcon />} />
        </Tabs>
      </AppBar>
      <Container maxWidth="lg" spacing={10}>
        {value === 0 && <Dashboard />}
        {value === 1 && <UserManager />}
        {value === 2 && <SpotManager />}
        {value === 3 && <Statistics />}
        {value === 4 && <Finance />}
      </Container>
    </div>
  );
};

export default Home;
