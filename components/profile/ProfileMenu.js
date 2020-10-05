import React, { useContext } from "react";
import ProfileContext from "../../src/ProfileContext";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import PhoneIcon from "@material-ui/icons/Phone";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => {
  return {
    divider: {
      backgroundColor: "#CAE7FE",
    },

    profileMenu: {
      fontSize: 18,
      fontWeight: "400",
      borderRadius: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        fontSize: 14,
      },
    },

    menuItem: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1),
      },
    },

    iconBox: {
      width: theme.spacing(8),
      display: "flex",
      justifyContent: "flex-end",
      marginRight: theme.spacing(4.5),
      [theme.breakpoints.down("sm")]: {
        marginRight: theme.spacing(1),
        width: theme.spacing(4),
      },
    },

    icon: {
      color: "#00BFA5",
      fontSize: 37,
      [theme.breakpoints.down("sm")]: {
        fontSize: 25,
      },
    },
  };
});

export default function ProfileMenu() {
  const classes = useStyles();

  const { userData } = useContext(ProfileContext);

  return (
    <Paper elevation={5} className={classes.profileMenu}>
      <div className={classes.menuItem}>
        <div className={classes.iconBox}>
          <AlternateEmailIcon className={classes.icon} />
        </div>
        {userData.mail || "Укажите e-mail"}
      </div>
      <Divider className={classes.divider} />
      <div className={classes.menuItem}>
        <div className={classes.iconBox}>
          <PhoneIcon className={classes.icon} />
        </div>
        {userData.phone || "Укажите номер телефона"}
      </div>
    </Paper>
  );
}
