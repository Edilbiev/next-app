import React, { useContext, useState } from "react";
import ProfileContext from "../../src/ProfileContext";
import TextField from "@material-ui/core/TextField";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import PhoneIcon from "@material-ui/icons/Phone";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ConfirmDialog from "../dialogs/ConfirmDialog";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InfoDialog from "../dialogs/InfoDialog";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import localData from "../../src/localData";

const useStyles = makeStyles((theme) => {
  return {
    profileEditor: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      borderRadius: theme.spacing(1),

      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1),
      },
    },

    container: {
      marginBottom: theme.spacing(2),
      flexWrap: "nowrap",

      "& > div": {
        borderRight: "1px solid #CAE7FE",
        paddingRight: 30,
        marginRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
      },

      "& > div:last-child": {
        borderRight: "none",
        paddingRight: 0,
        marginRight: 0,
      },

      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",

        "& > div": {
          borderRight: "none",
          paddingRight: theme.spacing(1),
          paddingLeft: theme.spacing(1),
          marginLeft: 0,
        },
      },
    },

    button: {
      borderRadius: "50vh",
      color: "white",
      padding: "15px 25px",
    },

    icon: {
      fontSize: 32,
      color: "#00BFA5",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },

    textField: {
      flex: 1,
      marginLeft: 30,

      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
        marginBottom: theme.spacing(1.5),
      },
    },
  };
});

export default function ProfileEditor({ toggleEditMode }) {
  const classes = useStyles();

  const { userData, setUserData } = useContext(ProfileContext);

  const [name, setName] = useState(userData.name);
  const handleChangeName = (e) => setName(e.target.value);

  const [mail, setMail] = useState(userData.mail);
  const handleChangeMail = (e) => setMail(e.target.value);

  const [phone, setPhone] = useState(userData.phone || "");
  const handleChangeNumber = (e) => setPhone(e.target.value);

  const [clicked, setClicked] = useState(false);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const handleOpenConfirmDialog = () => {
    setClicked(true);
    if (name !== "" && isEmail(mail) && isMobilePhone(phone)) {
      setShowConfirmDialog(true);
    }
  };

  const handleCloseConfirmDialog = () => {
    setError(false);
    setShowConfirmDialog(false);
  }

  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const handleOpenInfoDialog = () => {
    setShowConfirmDialog(false);
    setShowInfoDialog(true);
  };

  const handleCloseInfoDialog = () => {
    toggleEditMode();
    setShowInfoDialog(false);
  };

  const handleSaveData = () => {
    const updatedUserData = { name, mail, phone };

    setSaving(true);
    setError(false);

    //отправляем запрос на сервер, заменяем локалсторедж только если запрос прошел успешно
    setTimeout(() => {
      fetch("/api/save", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(updatedUserData),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success) {
            localData.save(updatedUserData);

            setUserData(updatedUserData);
            setSaving(false);

            handleOpenInfoDialog();
          } else {
            setSaving(false);
            setError(true);
          }
        });
    }, 1000);
  };

  return (
    <Paper className={classes.profileEditor} elevation={5}>
      <Grid container justify="space-evenly" className={classes.container}>
        <Grid container item xs={12} md={4} alignItems="center">
          <AssignmentIndIcon className={classes.icon} />
          <TextField
            className={classes.textField}
            error={clicked && name === ""}
            label="Фамилия и имя"
            placeholder="Укажите ваши фамилию и имя"
            variant="outlined"
            helperText={clicked && name === "" && "Вы неверно указали имя"}
            value={name}
            onChange={handleChangeName}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid container item xs={12} md={4} alignItems="center">
          <AlternateEmailIcon className={classes.icon} />
          <TextField
            className={classes.textField}
            error={clicked && !isEmail(mail)}
            label="Email"
            placeholder="Укажите свой емайл"
            helperText={clicked && !isEmail(mail) && "Вы неверно указали mail"}
            variant="outlined"
            value={mail}
            onChange={handleChangeMail}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid container item xs={12} md={4} alignItems="center">
          <PhoneIcon className={classes.icon} />
          <TextField
            className={classes.textField}
            error={clicked && !isMobilePhone(phone)}
            label="Номер телефона"
            helperText={
              clicked && !isMobilePhone(phone) && "Вы неверно указали номер"
            }
            placeholder="Укажите номер телефона"
            variant="outlined"
            value={phone}
            onChange={handleChangeNumber}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Button
          className={classes.button}
          onClick={handleOpenConfirmDialog}
          color="secondary"
          variant="contained"
          disableElevation
        >
          Сохранить изменения
        </Button>
      </Grid>

      <ConfirmDialog
        handleCloseDialog={handleCloseConfirmDialog}
        isOpened={showConfirmDialog}
        handleSaveData={handleSaveData}
        error={error}
        saving={saving}
      />
      <InfoDialog
        handleCloseDialog={handleCloseInfoDialog}
        isOpened={showInfoDialog}
      />
    </Paper>
  );
}

ProfileEditor.propTypes = {
  toggleEditMode: PropTypes.func.isRequired,
};
