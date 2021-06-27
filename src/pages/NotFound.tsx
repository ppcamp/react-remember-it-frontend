import React from "react";
import { Grid, Link, Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import { usePalette } from "app/static-contexts/theme-context";

export const Page404 = () => {
  const location = useLocation<string>();
  const history = useHistory();
  const palette = usePalette();
  const goToMain = () => history.push("/");
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{
          minHeight: "100vh",
          // backgroundColor: theme.palette.warning.dark,
        }}
      >
        <Grid item>
          <Grid container spacing={5} alignItems="center" wrap="nowrap">
            <Grid item>
              <Warning
                style={{ color: palette.warning.main }}
                fontSize="large"
              />
            </Grid>
            <Grid item>
              <Typography variant="h4">Página não encontrada</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={10} alignItems="center" wrap="nowrap">
            <Grid item>
              <Typography variant="body1">
                Não foi possível encontrar{" "}
                <span style={{ color: palette.warning.main }}>
                  {location.pathname}
                </span>
                . Por favor,{" "}
                <strong>
                  vá para a{" "}
                  <Link onClick={goToMain} component="button" variant="body1">
                    página principal
                  </Link>
                </strong>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
