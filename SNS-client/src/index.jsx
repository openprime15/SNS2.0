import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MenuContainer from "./MenuContainer";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        fontFamily: '"Noto Sans KR", serif'
    }
})


ReactDOM.render(<MuiThemeProvider theme={theme}><MenuContainer /></MuiThemeProvider>, document.querySelector("#container"));
