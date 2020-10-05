import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => {
  return {
    buttonConfirm: {
      padding: "16px 63px",
      borderRadius: "50vh",
      color: "white",
      marginBottom: 28,
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },

    title: {
      fontSize: 24,
      color: "rgba(49, 49, 49, 0.7)",
      fontWeight: 600,
      [theme.breakpoints.down("xs")]: {
        fontSize: 18,
      },
    },

    dialog: {
      width: 600,
      height: 318,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      borderRadius: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        height: 100,
        width: "100%",
        borderRadius: "10px 10px 0 0",
        margin: 0,
      },
    },

    container: {
      [theme.breakpoints.down("xs")]: {
        alignItems: "flex-end",
      },
    },
  };
});

export default function InfoDialog({ isOpened, handleCloseDialog }) {
  const classes = useStyles();

  return (
    <Dialog
      classes={{
        paper: classes.dialog,
        container: classes.container,
      }}
      open={isOpened}
      onClose={handleCloseDialog}
    >
      <DialogTitle className={classes.title}>
        Данные успешно сохранены
      </DialogTitle>
      <div>
        <Button
          className={classes.buttonConfirm}
          onClick={handleCloseDialog}
          variant="contained"
          color="secondary"
          disableElevation
        >
          Хорошо
        </Button>
      </div>
    </Dialog>
  );
}

InfoDialog.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};
