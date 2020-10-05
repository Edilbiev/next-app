import React, { useContext } from "react";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Context from "../src/ProfileContext";

const useStyles = makeStyles((theme) => {
  return {
    header: {
      display: "flex",
      justifyContent: "flex-end",
      color: "white",
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        marginBottom: theme.spacing(1),
      },
    },

    userData: {
      display: "flex",
      alignItems: "center",
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },

    divider: {
      backgroundColor: "white",
    },

    button: {
      color: "white",
      padding: 0,
      marginRight: theme.spacing(1),
    },

    icon: {
      fontSize: 30,
      [theme.breakpoints.down("xs")]: {
        fontSize: 20,
      },
    },

    avatar: {
      [theme.breakpoints.down("xs")]: {
        width: 24,
        height: 24,
      },
    },

    name: {
      fontWeight: 600,
      padding: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  };
});

export default function Header() {
  const classes = useStyles();
  const { userData } = useContext(Context);

  let userName = "";
  if (userData && userData.name) {
    const [fullname, firstname] = userData?.name?.split(" ");
    userName = `${fullname} ${firstname[0]}.`;
  }

  return (
    <div className={classes.header}>
      <IconButton className={classes.button}>
        <NotificationsNoneIcon className={classes.icon} />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" flexItem />
      <div className={classes.userData}>
        <Avatar className={classes.avatar} src="./avatar.svg" />
        <div className={classes.name}>{userName}</div>
      </div>
    </div>
  );
}
