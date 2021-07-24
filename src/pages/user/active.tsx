import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { usePalette } from "hooks/usePalette";

export const PageUserActive = () => {
  const history = useHistory();
  const palette = usePalette();

  setTimeout(() => {
    goToLogin();
  }, 3e3);

  const goToLogin = () => history.push("/login");
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Grid container spacing={5} alignItems="center" wrap="nowrap">
            <Grid item>
              <Favorite
                style={{ color: palette.error.main }}
                fontSize="large"
              />
            </Grid>
            <Grid item>
              <Typography variant="h4" align="center">
                Usuário ativado com sucesso!
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={10} alignItems="center" wrap="nowrap">
            <Grid item>
              <Typography variant="body1" align="center">
                Você será redirecionado automaticamente em 3s para o painel.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
