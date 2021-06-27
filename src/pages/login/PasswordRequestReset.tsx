import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { LockOpen } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { emailActions } from "store/slices/email";
import { Copyright } from "components/footer/basic";
import { REGEX_EMAIL } from "scripts/regex";
import { RootState } from "store";

const styling = makeStyles((theme: Theme) => ({
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

export const PasswordRequestReset = () => {
  // states
  const [isValid, setIsValid] = useState(true);

  // Redux
  const email = useSelector((state: RootState) => state.email.email);
  const dispatch = useDispatch();

  // Actions
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(emailActions.updateEmail(e.target.value));
  };

  // Handlers
  const checkEmail = useCallback(() => {
    const valid = REGEX_EMAIL.test(email);
    setIsValid(!email.length || valid);
  }, [email]);
  const submit = () => {
    console.log(email);
  };

  // Watchers
  useEffect(() => {
    const debounce = setTimeout(() => checkEmail(), 500);

    return () => clearTimeout(debounce);
  }, [email, checkEmail]);

  const classes = styling();

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpen />
        </Avatar>
        <Typography component="h1" variant="h5">
          Recuperar senha
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onEmailChange}
            value={email}
            helperText={!isValid && "Email inválido"}
            error={!isValid}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isValid || !email.length}
            onClick={submit}
          >
            Enviar email
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
