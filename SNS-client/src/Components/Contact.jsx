import React, { Component } from "react";
import axios from "axios";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        목표달성 SNS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Contact extends Component {
  state = {
    name: "",
    emailEntered: '',
    isEmailValid: false,
  };

  validateEmail = emailEntered => {
    const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
  
    if (emailEntered.match(emailRegExp)) {
      this.setState({
        isEmailValid: true,
        emailEntered
      });
    } else {
      this.setState({
        isEmailValid: false,
        emailEntered
      });
    }
  };

  memberInsert = () => {
    if(!this.nameE.value || !this.emailE_Contact.value || !this.pwE_Contact.value){
      alert("필수 항목을 입력하세요");
      return;
    }

    const send_param = {
      headers,
      name: this.nameE.value,
      email: this.emailE_Contact.value,
      pw: this.pwE_Contact.value,
      comments: this.commentsE.value
    };

    axios
      .post("http://localhost:8080/member/insert", send_param)
      .then(returnData => {
        alert(returnData.data.message);
        if(returnData.data.href){
        window.location.href = "/login#/login";
       }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {

    const {classes} = this.props;

    return (
      <div>
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <div className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Name"
                inputRef={ref => (this.nameE = ref)}
                label="이름"
                name="Name"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={!this.state.isEmailValid}
                helperText={this.state.isEmailValid ? "유효한 이메일입니다." : "이메일이 유효하지 않습니다." }
                id="email"
                inputRef={ref => (this.emailE_Contact = ref)}
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => this.validateEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                inputRef={ref => (this.pwE_Contact = ref)}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
          id="outlined-multiline-static"
          inputRef={ref => (this.commentsE = ref)}
          label="하고싶은 말"
          fullWidth
          multiline
          rows="4"
          variant="outlined"
        />
        </Grid>
            <Grid item xs={12}>
              
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="정보 제공 이메일을 받겠습니다."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.memberInsert}
          >
            가입
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/#/login" variant="body2">
                계정이 있으신가요? 지금 바로 로그인
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>

      </div>
    );
  }
}

export default withStyles(styles)(Contact);
