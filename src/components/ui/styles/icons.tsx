import { Box, CircularProgress } from "@material-ui/core";
import { DoneAll } from "@material-ui/icons";

export const EndIcon = () => {
  return (
    <Box m={4} alignItems="center" display="flex" justifyContent="space-around">
      <Box>
        <DoneAll />
      </Box>
    </Box>
  );
};

export const LoadingIcon = () => {
  return (
    <Box m={4} alignItems="center" display="flex" justifyContent="space-around">
      <Box>
        <CircularProgress />
      </Box>
    </Box>
  );
};
