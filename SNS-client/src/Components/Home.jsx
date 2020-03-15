import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";


import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';


axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  }
});


class Home extends Component {
  state = {
    writeStyle: "none",
    posts: [],
    deleteStyle: "none"
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:8080/board/view", { headers })
      .then(returnData => {
        
        this.setState({
          posts:returnData.data.posts
        })
      });
  };


  addBoard = () => {
    const send_param = {
      headers,
      title: this._BoardTitle.value,
      comments: this._Comments.value,
      no: $.cookie("login_no")
    };

    axios
      .post("http://localhost:8080/board/insert", send_param)
      .then(returnData => {
        alert(returnData.data.message);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });

    // alert(this._BoardNick.value);
  };

  deleteBoard=(board_no, member_no)=>{
    const login_no = Number($.cookie("login_no"));
    if(login_no===member_no){
      const send_param = {
        headers,
        board_no
      }
      axios.post("http://localhost:8080/board/delete", send_param)
      .then(returnData=>{
        alert(returnData.data.message);
        window.location.reload();
      })

    }else{
      alert("본인만 글 제거가 가능합니다.");
    }
  }


  render() {

    const { classes} = this.props;

    const writeStyle = {
      display: this.state.writeStyle
    };
    if ($.cookie("login_email")) {
      writeStyle.display = "show";
    }

    const deleteStyle = {
      display: this.state.deleteStyle
    };
    const login_no = Number($.cookie("login_no"));


    return (
      <div>
         <React.Fragment>
      <CssBaseline />
        <div className={classes.heroContent}>
          <Container maxWidth="sm" >
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom style={writeStyle}>
          {$.cookie("login_name")}님 
          </Typography>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              당신의 목표는?
            </Typography>
            <div className={classes.heroButtons} style={writeStyle}>
              <Grid container spacing={2} justify="center" >
                <Grid item>
                <TextField
          id="standard-helperText"
          label="목표"
          inputRef={ref => (this._BoardTitle = ref)}
        />
                </Grid>
                <Grid item>
                <TextField
          id="standard-helperText"
          label="내용"
          helperText="구체적으로 어떤 목표인가요"
          inputRef={ref => (this._Comments = ref)}
        />
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={this.addBoard}>
                    목표 게시
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={6}>
            {this.state.posts.map(posts => (
              <Grid item key={posts.b_no} xs={12} md={6}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {posts.title}
                    </Typography>
                    <Typography>
                     {posts.content}
                    </Typography>
                    <Typography>
                     작성자:{posts.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary" >
                      Edit
                    </Button>
                    <Button size="small"  color="primary" style={login_no===posts.m_no? writeStyle : deleteStyle} onClick={()=>this.deleteBoard(posts.b_no, posts.m_no)}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    </React.Fragment>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
