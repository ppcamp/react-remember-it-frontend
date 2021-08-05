// TODO: not implemented yet
import React, { useCallback, useEffect, useReducer, useState } from "react";
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
import { Copyright } from "components/StickyFooter/basic";
import { useParams } from "react-router-dom";
import {
  REGEX_HAS_DIGITS,
  REGEX_HAS_LETTERS,
  REGEX_HAS_SPECIAL_CHARS,
} from "scripts/regex/regex";
import { insert_at } from "scripts/functions/string";
import { RouteParams } from "scripts/types/router";

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

type PasswordReducerState = {
  password: string;
  isValid: boolean;
  errorMessage: string;
  checkPassword: string;
};

const initialFields = {
  password: "",
  isValid: true,
  errorMessage: "",
  checkPassword: "",
};

enum ActionKind {
  "HANDLE_INPUT_CHANGE",
  "HANDLE_VALIDITY",
}

type Action = {
  type: ActionKind;
  payload?: string;
  isValid?: boolean;
  errorMessage?: string;
  field?: string;
};

const fieldsReducer = (
  state: PasswordReducerState,
  action: Action
): PasswordReducerState => {
  const { type, payload, isValid, errorMessage, field } = action;

  switch (type) {
    case ActionKind.HANDLE_INPUT_CHANGE:
      if (!field || !payload)
        throw Error("You must pass 'isValid' and 'errorMessage'");
      return { ...state, [field]: payload };
    case ActionKind.HANDLE_VALIDITY:
      if (!isValid || !errorMessage)
        throw Error("You must pass 'isValid' and 'errorMessage'");
      return { ...state, isValid, errorMessage };
    default:
      return initialFields;
  }
};

export const PasswordReset = () => {
  // Query params
  const { id } = useParams<RouteParams>();

  // States
  const [form, dispatch] = useReducer(fieldsReducer, initialFields);
  const [showError, setShowError] = useState(false);

  // Actions
  const onUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionKind.HANDLE_INPUT_CHANGE,
      field: e.target.name,
      payload: e.target.value as string,
    });
  };

  // Handlers
  const checkRequirements = useCallback(() => {
    let isValid = true;
    if (!form.password.length) {
      dispatch({ type: ActionKind.HANDLE_VALIDITY, isValid, errorMessage: "" });
    }
    // Handling errors
    else {
      let errors = [];

      if (form.password.length < 8 || form.password.length > 16) {
        errors.push("de [8 a 16] caracteres");
        isValid = false;
      }
      if (!REGEX_HAS_LETTERS.test(form.password)) {
        errors.push("letras (maiúsculas e minúsculas)");
        isValid = false;
      }
      if (!REGEX_HAS_SPECIAL_CHARS.test(form.password)) {
        errors.push("caracteres especiais");
        isValid = false;
      }
      if (!REGEX_HAS_DIGITS.test(form.password)) {
        errors.push("números");
        isValid = false;
      }

      // Creating error message
      let errorMessage = "A senha deve ter: " + errors.join(", ") + ".";
      const pos = errorMessage.lastIndexOf(",");
      if (pos !== -1) errorMessage = insert_at(errorMessage, pos, " e ");

      dispatch({ type: ActionKind.HANDLE_VALIDITY, isValid, errorMessage });
    }
  }, [form.password]);

  const submit = () => {
    const data = {
      password: form.password,
    };
    console.debug(`Submit on #${id}: ${JSON.stringify(data)}`);
  };

  // Watchers (With debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      checkRequirements();
      // Only show the error message
      setShowError(
        form.password !== form.checkPassword && form.checkPassword.length > 0
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [checkRequirements, form.checkPassword, form.password]);

  // Style
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

        {/* Field 1 */}
        <form className={classes.form} noValidate>
          <TextField
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Senha"
            name="password"
            autoComplete="password"
            autoFocus
            onChange={onUpdate}
            value={form.password}
            placeholder="Digite a senha"
            error={!form.isValid}
            helperText={!form.isValid && form.errorMessage}
          />

          {/* Field 2 */}
          <TextField
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Repita a senha"
            name="checkPassword"
            autoComplete="checkPassword"
            onChange={onUpdate}
            value={form.checkPassword}
            placeholder="Digite a senha novamente"
            error={showError}
            helperText={showError && "As senhas não coincidem"}
          />

          {/* Button */}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
            Alterar
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
