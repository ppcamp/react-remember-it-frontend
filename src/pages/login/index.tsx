import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LockOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import emailActions from "store/slices/email/actions";
import { useHistory } from "react-router-dom";
import { Copyright } from "components/StickyFooter/basic";
import {
  REGEX_EMAIL,
  REGEX_HAS_DIGITS,
  REGEX_HAS_LETTERS,
  REGEX_HAS_SPECIAL_CHARS,
} from "scripts/regex/regex";
import { insert_at } from "scripts/functions/string";
import { RootState } from "store";
import { Endpoints } from "api/endpoints";
import { ApiHeaders, ApiOperation } from "api/base";
import {StatusCodes} from 'http-status-codes';
import { LoginResponse } from "scripts/types/login-response";
import { useAuth } from "hooks/useAuth";
import { TransitionAlerts } from "components/ui/TransitionAlerts";

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

export const SignIn = () => {
  // Context
  const auth = useAuth();

  //#region States
  const [remember, setRemember] = useState(false);
  const [password, setPassword] = useState({
    value: "",
    isValid: true,
    errorMessage: "",
  });
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [uiErr, setUiErr] = useState(false);

  // Redux states
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.email.email);
  //#endregion

  // History
  const history = useHistory();

  //#region Actions
  const onToggleRemember = () => {
    setRemember(!remember);
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(emailActions.updateEmail(e.target.value));
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, value: e.target.value });
  };
  const onForgetPassword = () => history.push("/login/recover-password");
  const onNewUser = () => history.push("/login/signup");
  //#endregion

  //#region Handlers
  /**
   * Check if email is valid
   */
  const checkEmail = useCallback(() => {
    const valid = REGEX_EMAIL.test(email);
    setEmailIsValid(!email.length || valid);
  }, [email]);

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
    history.push('/dashboard');
  }

  /**
   * Login into system, stores the data into local/session storage
   */
  const submit = () => {
    const url = Endpoints.login.toString();
    const data = {
      email,
      password: password.value
    };
    // reset error
    setUiErr(false);

    fetch(url,{
      method: ApiOperation.POST,
      headers: ApiHeaders.JSON,
      body: JSON.stringify(data)
    }).then(r => {
      // check if everything ok with request
      if (r.status === StatusCodes.OK) {
        return r.json();
      } else {
        throw r.statusText;
      }
    }).then(data=>{
      const r:LoginResponse = {access_token:""};
      Object.assign(r,data);
      auth.onLogin(r.access_token,remember);
      redirectToDashboard()
    }).catch(()=>setUiErr(true));
  };

  //#endregion

  //#region watchers
  useEffect(() => {
    const debounce = setTimeout(() => checkEmail(), 500);

    return () => clearTimeout(debounce);
  }, [email, checkEmail]);
  useEffect(() => {
    const timer = setTimeout(() => checkRequirements(), 500);

    return () => clearTimeout(timer);
  }, [checkRequirements, password.value]);
  //#endregion

  // Style
  const classes = styling();

  return (
    <>
    {uiErr && <TransitionAlerts
      severity="error"
      title="Houve um problema com o login!"
      message="Cheque se o seu email/senha está correto(a). Caso tenha criado a conta recentemente, será necessário ativá-la através do link enviado ao seu email"
    />}

    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onEmailChange}
            value={email}
            helperText={!emailIsValid && "Email inválido"}
            error={!emailIsValid}
          />
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Manter logado"
            onClick={onToggleRemember}
            value={remember}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href='/login/recover-password'
                variant="body2"
                onClick={onForgetPassword}
              >
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="" onClick={onNewUser} variant="body2">
                {"Não tem uma conta? Crie uma!"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
};
