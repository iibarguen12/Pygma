import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { SettingsGeneral } from 'src/sections/settings/settings-general';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const PADDING_TOP = 1; // TODO move to a global variable
const Page = () => (
  <>
    <Head>
      <title>
        Settings | Pygma
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: PADDING_TOP
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <SettingsGeneral />
          <SettingsPassword />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
