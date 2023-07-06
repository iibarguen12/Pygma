import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { useState } from 'react';

const PADDING_TOP = 1;

const Page = () => {
  const [user, setUser] = useState(JSON.parse(window.sessionStorage.getItem('user')));

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <>
      <Head>
        <title>Account | Pygma</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: PADDING_TOP }}>
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <AccountProfile user={user} />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <AccountProfileDetails user={user} onUserUpdate={handleUserUpdate} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
