import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Button,
  Box,
} from "@material-ui/core";
import {
  AccountCircle,
  Brightness4,
  Brightness4Outlined,
} from "@material-ui/icons";
import { usePalette, useThemeCtx } from "app/static-contexts/theme-context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontFamily: '"Kaushan Script", cursive',
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  })
);

export const MenuAppBar = () => {
  const classes = useStyles();

  // Theme control
  const theme = useThemeCtx();
  const palette = usePalette();
  const themeIcon =
    palette.type === "dark" ? <Brightness4 /> : <Brightness4Outlined />;

  // UserName
  const userName = "ppcamp";

  // HiddenMenu user toggle
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  // Element itself
  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          {/* Title */}
          <Typography variant="h6" className={classes.title} noWrap>
            Remember-it
          </Typography>

          {/* Left Icons */}
          <div className={classes.sectionDesktop}>
            {/* Mail notification
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <Mail />
              </Badge>
            </IconButton>
            */}

            {/* Notifications
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            */}

            {/* Toggle theme */}
            <Box pr={2}>
              <IconButton
                aria-label="toggle theme"
                color="inherit"
                size="small"
                name="Change theme"
                onClick={theme.toggleTheme}
              >
                {themeIcon}
              </IconButton>
            </Box>

            {/* User login */}
            <Box>
              <Button
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleUserMenu}
                color="inherit"
                startIcon={<AccountCircle />}
              >
                {userName}
              </Button>
            </Box>
          </div>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>Configurações</MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>Sair</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};