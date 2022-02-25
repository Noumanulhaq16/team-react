// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid} from '@mui/material';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidgetSummary,
} from '../../sections/@dashboard/general/app';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="Super Admin: Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="My Company"
              percent={2.6}
              total={18765}
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="My Contacts"
              percent={0.2}
              total={4876}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="My Locations"
              percent={-0.1}
              total={678}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="My Assets"
              percent={-0.1}
              total={678}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
