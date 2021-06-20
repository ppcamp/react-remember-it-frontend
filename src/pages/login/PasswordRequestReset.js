import React from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LockOpen } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { emailActions } from "store/slices/email";
import { Copyright } from "components/footer/basic";

const styling = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const PasswordReset = () => {
  // Redux
  const email = useSelector((state) => state.email.email);
  const dispatch = useDispatch();

  // Actions
  const onEmailChange = (e) => {
    dispatch(emailActions.updateEmail(e.target.value));
  };

  const classes = styling();

  return (
    <Container maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpen />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Recuperar senha
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={onEmailChange}
            value={email}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Recuperar
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
