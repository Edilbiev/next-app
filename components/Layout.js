import Link from "./Link";
import Header from "./Header";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  layout: {
    fontFamily: "'Open Sans', sans-serif",
    backgroundImage: "url('./Rectangle1.svg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: "100vh",
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
      backgroundSize: "auto 30vh",
    },
  },

  links: {
    fontSize: 14,
    marginTop: theme.spacing(1),
    fontWeight: 400,
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
      marginTop: theme.spacing(0.5),
    },
  },

  pageTitle: {
    color: "white",
    fontWeight: 600,
    fontSize: 18,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
      marginBottom: theme.spacing(1),
    },
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Header />

      <div className={classes.pageTitle}>
        <div>ЛИЧНЫЙ ПРОФИЛЬ</div>
        <div className={classes.links}>
          <Link href="/">Главная</Link>/<Link href="/">Личный профиль</Link>
        </div>
      </div>

      {children}
    </div>
  );
}
