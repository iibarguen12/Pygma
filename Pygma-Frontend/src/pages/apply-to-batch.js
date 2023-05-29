import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const PADDING_TOP = 1;

const Page = () => (
  <>
    <Head>
      <title>Apply to batch | Pygma</title>
    </Head>
    <Box
      component="main"
      sx={{
        py: PADDING_TOP,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <iframe
        src="https://application.pygma.co"
        title="Apply to Batch"
        width="100%"
        height="100%"
        allowtransparency="true"
        allowfullscreen="true"
        scrolling="hidden"
        frameBorder="0"
      />
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
