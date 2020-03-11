import $ from "jquery";
import {} from "jquery.cookie";
import React, { Component } from "react";
import Chatting from "./Components/Chatting";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import { Route, HashRouter, Link as RouterLink} from "react-router-dom";
import axios from "axios";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import CssBaseline from '@material-ui/core/CssBaseline';

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};



class MenuContainer extends Component {
  state = {
    loginStyle: "",
    logoutStyle: "none"
  };



  memberLogout = () => {
    axios
      .get("http://localhost:8080/member/logout", { headers })
      .then(returnData => {
        if (returnData.data.message) {
          $.removeCookie("login_email");
          $.removeCookie("login_no");

          this.setState({
            login_email: "",
            loginStyle: "inline-block",
            logoutStyle: "none"
          });
          window.location.href="/";
        }
      });
  };

  render() {
   
    const { classes } = this.props;

    const loginStyle = {
      display: this.state.loginStyle
    };
    const logoutStyle = {
      display: this.state.logoutStyle
    };
    if ($.cookie("login_email")) {
      loginStyle.display = "none";
      logoutStyle.display = "show";
    }

    return (
      <div>
        <div className={classes.root}>
      <AppBar position="static">
      <CssBaseline />
      <HashRouter>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" component={RouterLink} exact to="/">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            목표달성 SNS
          </Typography>
          <Button color="inherit" component={RouterLink} to="/chatting">채팅</Button>
          <Button color="inherit" component={RouterLink} to="/contact">회원가입</Button>
          <Button color="inherit" style={loginStyle} component={RouterLink} to="/login">Login</Button>
          <Button color="inherit" style={logoutStyle} onClick={this.memberLogout}>Logout</Button>
        </Toolbar>
      </HashRouter>
      </AppBar>
    </div>

        <HashRouter>
            <div className="content">
              <Route exact path="/" component={Home}></Route>
              <Route path="/contact" component={Contact}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/chatting" component={Chatting}></Route>
            </div>
        </HashRouter>
      </div>
    );
  }
}

export default withStyles(styles)(MenuContainer);
