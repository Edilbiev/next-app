import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => {
  return {
    buttonConfirm: {
      padding: "16px 63px",
      borderRadius: "50vh",
      color: "white",
      marginBottom: 28,
    },

    loader: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -35,
      marginLeft: -20,
    },

    buttonDecline: {
      padding: "15px 50px",
      borderRadius: "50vh",
    },

    dialog: {
      width: 600,
      height: 315,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      borderRadius: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        borderRadius: "10px 10px 0 0",
        margin: 0,
        height: 425,
      },
    },

    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },

    buttonWrapper: {
      position: "relative",
    },

    title: {
      fontSize: 24,
      color: "rgba(49, 49, 49, 0.7)",
      fontWeight: "600",
      [theme.breakpoints.down("xs")]: {
        marginBottom: theme.spacing(4),
        fontSize: 18,
      },
    },

    error: {
      color: "#ff2400",
      marginBottom: theme.spacing(1),
    },

    container: {
      [theme.breakpoints.down("xs")]: {
        alignItems: "flex-end",
      },
    },
  };
});

export default function ConfirmDialog({
  isOpened,
  handleCloseDialog,
  handleSaveData,
  saving,
  error,
}) {
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
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={handleCloseDialog}
      >
        <CloseIcon />
      </IconButton>
      <div>
        <DialogTitle className={classes.title}>
          Сохранить изменения?
        </DialogTitle>
        {error && <div className={classes.error}>Во время запроса произошла ошибка</div>}
        <div className={classes.buttonWrapper}>
          <Button
            className={classes.buttonConfirm}
            onClick={handleSaveData}
            variant="contained"
            color="secondary"
            disableElevation
            disabled={saving}
          >
            Сохранить
          </Button>
          {saving && (
            <div className={classes.loader}>
              <CircularProgress />
            </div>
          )}
        </div>
        <Box>
          <Button
            className={classes.buttonDecline}
            variant="outlined"
            color="secondary"
            onClick={handleCloseDialog}
          >
            Не сохранять
          </Button>
        </Box>
      </div>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  handleSaveData: PropTypes.func.isRequired,
};
