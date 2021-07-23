import React, { useCallback, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Copyright } from "components/StickyFooter/basic";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import emailActions from "store/slices/email/actions";
import {
  REGEX_EMAIL,
  REGEX_HAS_DIGITS,
  REGEX_HAS_LETTERS,
  REGEX_HAS_SPECIAL_CHARS,
} from "scripts/regex/regex";
import { insert_at } from "scripts/functions/string";
import { USER_NICK_MAXSIZE } from "scripts/constants/user";
import { Endpoints } from "api/endpoints";
import { ApiHeaders, ApiOperation } from "api/base";
import { StatusCodes } from "http-status-codes";
import { UserPayloadCreate } from "scripts/types/user.endpoint";
import { useAlerts } from "hooks/useAlerts";
import { TransitionAlertsProps } from "components/ui/TransitionAlerts";

//#region styling
const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
//#endregion

namespace UI_ALERTS {
  export const created: TransitionAlertsProps = {
    message:
      "Foi enviado um link para a ativação da sua conta! Por gentileza, cheque seu email.",
    title: "Usuário criado com sucesso!",
    severity: "success",
  };
  export const error: TransitionAlertsProps = {
    message: "Motivo do problema",
    title: "Houve um erro ao criar o usuário",
    severity: "error",
  };
}

export const SignUp = () => {
  const classes = useStyles();

  //#region States
  const [uiOut, setUiOut] = useState({ show: true, alert: UI_ALERTS.error });

  const [nick, setNick] = useState("");

  const [password, setPassword] = useState({
    value: "",
    isValid: true,
    errorMessage: "",
  });

  const [email, setEmail] = useState({
    value: "",
    isValid: true,
    errorMessage: "",
  });

  // Redux states
  const dispatch = useDispatch();
  //#endregion

  // History
  const history = useHistory();

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(emailActions.updateEmail(e.target.value));
    setEmail((state) => ({ ...state, value: e.target.value }));
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((state) => ({ ...state, value: e.target.value }));
  };
  const onNickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNick(e.target.value);
  };
  const onUserExists = () => history.push("/login");
  //#endregion

  //#region UI
  const alerts = useAlerts();
  //#endregion

  //#region Handlers
  /**
   * Check if email is valid
   */
  const checkEmail = useCallback(() => {
    const isValid = REGEX_EMAIL.test(email.value) || !email.value.length;
    setEmail((state) => ({ ...state, isValid }));
  }, [email.value]);

  /**
   * Check if the password attend to its requirement
   */
  const checkRequirements = useCallback(() => {
    let isValid = true;
    if (!password.value.length) {
      setPassword((state) => ({ ...state, isValid, errorMessage: "" }));
    }
    // Handling errors
    else {
      let errors = [];

      if (password.value.length < 8 || password.value.length > 16) {
        errors.push("de [8 a 16] caracteres");
        isValid = false;
      }
      if (!REGEX_HAS_LETTERS.test(password.value)) {
        errors.push("letras (maiúsculas e minúsculas)");
        isValid = false;
      }
      if (!REGEX_HAS_SPECIAL_CHARS.test(password.value)) {
        errors.push("caracteres especiais");
        isValid = false;
      }
      if (!REGEX_HAS_DIGITS.test(password.value)) {
        errors.push("números");
        isValid = false;
      }

      // Creating error message
      let errorMessage = "A senha deve ter: " + errors.join(", ") + ".";
      const pos = errorMessage.lastIndexOf(",");
      if (pos !== -1) errorMessage = insert_at(errorMessage, pos, " e ");

      setPassword((state) => ({ ...state, isValid, errorMessage }));
    }
  }, [password.value]);

  const redirectToDashboard = () => {
    history.push("/dashboard");
  };

  /**
   * Create an user
   */
  const submit = () => {
    const url = Endpoints.users.toString();
    const data: UserPayloadCreate = {
      email: email.value,
      password: password.value,
      username: nick,
    };
    console.log(data);
    console.log("Submiting");

    // reset error
    setUiOut((state) => ({ ...state, show: false }));
    fetch(url, {
      method: ApiOperation.POST,
      headers: ApiHeaders.JSON,
      body: JSON.stringify(data),
    })
      .then((r) => {
        // check if everything ok with request
        if (r.status === StatusCodes.CREATED) {
          return r.json();
        } else {
          throw r.json();
        }
      })
      .then((data) => {
        setUiOut({ show: true, alert: UI_ALERTS.created });
        redirectToDashboard();
      })
      .catch((err) => {
        const d = { ...UI_ALERTS.error };
        d.message = err.message;
        setUiOut({ show: true, alert: d });
      });
  };

  //#endregion

  //#region watchers
  useEffect(() => {
    const debounce = setTimeout(() => checkEmail(), 500);

    return () => clearTimeout(debounce);
  }, [email.value, checkEmail]);
  useEffect(() => {
    const timer = setTimeout(() => checkRequirements(), 500);

    return () => clearTimeout(timer);
  }, [checkRequirements, password.value]);
  useEffect(() => {
    alerts.addAlert(uiOut.alert);
  }, [uiOut.show]);
  //#endregion

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Criação de conta
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="nick"
                label="Apelido"
                name="Apelido"
                autoComplete="nickname"
                autoFocus
                onChange={onNickChange}
                value={nick}
                helperText={
                  nick.length > USER_NICK_MAXSIZE &&
                  "Estourou a quantidade máxima de characteres permitida"
                }
                error={nick.length > USER_NICK_MAXSIZE}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={onEmailChange}
                value={email.value}
                helperText={!email.isValid && "Email inválido"}
                error={!email.isValid}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                autoComplete="current-password"
                onChange={onPasswordChange}
                value={password.value}
                error={!password.isValid}
                helperText={!password.isValid && password.errorMessage}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
            Criar conta
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="" onClick={onUserExists} variant="body2">
                Já possui uma conta? Faça login.
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};
