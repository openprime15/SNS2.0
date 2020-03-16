import $ from "jquery";
import {} from "jquery.cookie";
import React, { Component } from "react";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        목표달성 SNS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class Login extends Component {
  state = {
    login_email: ""
  };

  memberLogin = () => {
    if (!this.emailE_Login.value || !this.pwE_Login.value) {
      alert("빈칸을 입력하세요");
      return;
    }
    const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

    if (this.emailE_Login.value.match(emailRegExp)) {
      const send_param = {
        headers,
        email: this.emailE_Login.value,
        pw: this.pwE_Login.value
      };
      axios
        .post("http://localhost:8081/member/login", send_param)
        .then(returnData => {
          if (returnData.data.email) {
            $.cookie("login_email", returnData.data.email);
            $.cookie("login_no", returnData.data.no);
            $.cookie("login_name", returnData.data.name);
            alert(returnData.data.message);

            this.setState({
              login_email: returnData.data.email
            });
            window.location.href = "/";
          } else {
            alert("로그인 실패");
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert("이메일 형식이 유효하지 않습니다.");
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <div className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                inputRef={ref => (this.emailE_Login = ref)}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                inputRef={ref => (this.pwE_Login = ref)}
                autoComplete="current-password"
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.memberLogin}
              >
                로그인
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </div>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
