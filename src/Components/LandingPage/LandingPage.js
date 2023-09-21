import * as React from "react";
import "./LandingPage.css";
import logo from "../../Assets/cw-logo.png";
import cloudwisePoster from "../../Assets/cw-poster.png";
import { Button, Tooltip } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e6923a",
    },
  },
});

function LandingPage(props) {
  const { isLoggedIn } = props;

  return (
    <div className="landing-page-wrapper">
      <div className="navigation-tab-wrapper">
        <div className="navigation-tab-content-div">
          <div className="logo-div">
            <img src={logo} alt="cw-logo" />
          </div>
          <div className="nav-items-div">
            <Tooltip title="Upcoming feature">
              <div className="nav-item">Blog</div>
            </Tooltip>
            <Tooltip title="Upcoming feature">
              <div className="nav-item">Pricing</div>
            </Tooltip>
            <div className="nav-item">
              <ThemeProvider theme={theme}>
                <Link to="/signup">
                  <Button
                    size="small"
                    color="primary"
                    variant="text"
                    sx={{
                      width: "70px",
                      height: "30px",
                      fontWeight: "bold",
                      border: "solid 1px #e6923a",
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
      <div className="main-container-wrapper">
        <div className="main-container">
          <div className="main-container-content">
            <h1>
              <span>Charting Cloud Success:</span> Precision Insights, Cost
              Reduction
            </h1>
            <div className="about-tool-content">
              Elevate your cloud management with precise analytics through our
              inspector tool.
            </div>
            <ThemeProvider theme={theme}>
              <Link to={isLoggedIn ? "/dashboard" : "/login"}>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  endIcon={<NavigateNextIcon />}
                  sx={{
                    width: "180px",
                    height: "50px",
                    fontWeight: "bold",
                    border: "solid 1.4px #e6923a",
                  }}
                >
                  Get started
                </Button>
              </Link>
            </ThemeProvider>
          </div>
          <div className="main-container-poster">
            <img src={cloudwisePoster} alt="cloudwise poster" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
