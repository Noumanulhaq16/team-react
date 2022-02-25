import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import logoss from '../assets/image/logo_full.png';


// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};


export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <>
      <Box sx={{ margin: "auto", width: 40, height: 40, ...sx, textAlign: 'center' }}>
        <img src={logoss} alt="logo" />
      </Box >

      {/* <Box sx={{ width: 200, margin: "auto", textAlign: 'center', typography: 'body1', color: "RED", }}>
        <p>Teams</p>
      </Box > */}
    </>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
