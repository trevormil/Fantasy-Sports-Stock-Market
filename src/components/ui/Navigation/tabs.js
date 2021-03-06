import React from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "@material-ui/core";
import * as ROUTES from "../../../constants/routes";
import { logOutUser } from "../../../redux/actions/userActions";
import store from "../../../redux/stores";

const getInitialState = () => {
  const pathName = window.location.pathname.split("/");
  if (pathName[pathName.length - 2] === "stocks") {
    return ROUTES.BROWSE;
  } else return `/${pathName.pop()}`;
};
class TabBase extends React.Component {
  state = {
    value: getInitialState(),
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };

  logOut = () => {
    const currURL = `/${window.location.pathname.split("/").pop()}`;
    let nonAuthTab = false;
    store.dispatch(logOutUser());
    nonAuthenticatedTabs.forEach((tab) => {
      if (tab.linkTo === currURL) nonAuthTab = true;
    });
    if (!nonAuthTab) this.setState({ value: ROUTES.SIGN_IN });
    else
      this.setState({ value: `/${window.location.pathname.split("/").pop()}` });
  };

  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        centered
      >
        {this.props.authenticated
          ? authenticatedTabs.map((tab) => {
              if (tab.buttonOnClick)
                return (
                  <Tab
                    key={tab.label}
                    label={tab.label}
                    value={tab.linkTo}
                    onClick={this.logOut}
                  />
                );
              //hard coded for sign out tab currently
              else
                return (
                  <Tab
                    key={tab.label}
                    label={tab.label}
                    value={tab.linkTo}
                    component={Link}
                    to={tab.linkTo}
                  />
                );
            })
          : nonAuthenticatedTabs.map((tab) => {
              if (tab.buttonOnClick)
                return (
                  <Tab
                    key={tab.label}
                    label={tab.linkTo}
                    value={tab.label}
                    onClick={this.logOut}
                  />
                );
              else
                return (
                  <Tab
                    key={tab.label}
                    label={tab.label}
                    value={tab.linkTo}
                    component={Link}
                    to={tab.linkTo}
                  />
                );
            })}
      </Tabs>
    );
  }
}
const authenticatedTabs = [
  {
    label: "Home",
    linkTo: ROUTES.HOME,
  },
  {
    label: "Bracket",
    linkTo: ROUTES.BRACKET,
  },
  {
    label: "SCHEDULE",
    linkTo: ROUTES.SCHEDULE,
  },
  {
    label: "Screener",
    linkTo: ROUTES.BROWSE,
  },
  {
    label: "Market",
    linkTo: ROUTES.MARKET,
  },
  {
    label: "Portfolio",
    linkTo: ROUTES.PORTFOLIO,
  },
  {
    label: "Leaderboards",
    linkTo: ROUTES.LEADERBOARD,
  },
  {
    label: "Rules",
    linkTo: ROUTES.RULES,
  },
  {
    label: "Sign Out",
    buttonOnClick: true,
  },
];

const nonAuthenticatedTabs = [
  {
    label: "Home",
    linkTo: ROUTES.HOME,
  },
  {
    label: "Bracket",
    linkTo: ROUTES.BRACKET,
  },
  {
    label: "Schedule",
    linkTo: ROUTES.SCHEDULE,
  },
  {
    label: "Rules",
    linkTo: ROUTES.RULES,
  },
  {
    label: "Sign In",
    linkTo: ROUTES.SIGN_IN,
  },
];

export default TabBase;
