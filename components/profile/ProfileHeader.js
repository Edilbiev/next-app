import React, { useContext } from "react";
import ProfileContext from "../../src/ProfileContext";
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      backgroundColor: "#1A78C2",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      borderRadius: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    },

    avatar: {
      width: 80,
      height: 80,
      [theme.breakpoints.down("xs")]: {
        width: 40,
        height: 40,
      },
    },

    username: {
      fontSize: 30,
      fontWeight: 600,
      paddingLeft: theme.spacing(4.5),
      paddingRight: theme.spacing(4.5),
      [theme.breakpoints.down("xs")]: {
        fontSize: 14,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
    },

    profile: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    button: {
      fontWeight: 600,
      color: "white",
    },

    buttonText: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  };
});

export default function ProfileHeader({ toggleEditMode, editMode }) {
  const classes = useStyles();

  const { userData } = useContext(ProfileContext);

  return (
    <Paper className={classes.paper} elevation={5}>
      <div className={classes.profile}>
        <Avatar className={classes.avatar} src="./avatar.svg" />
        <div className={classes.username}>{userData.name}</div>
      </div>
      <div>
        <Button
          endIcon={editMode ? <CloseIcon /> : <CreateIcon />}
          onClick={toggleEditMode}
          className={classes.button}
        >
          <div className={classes.buttonText}>
            {editMode ? "ЗАКРЫТЬ" : "РЕДАКТИРОВАТЬ"}
          </div>
        </Button>
      </div>
    </Paper>
  );
}

ProfileHeader.propTypes = {
  editMode: PropTypes.bool.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
};
