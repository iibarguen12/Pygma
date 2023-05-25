import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';

export const AccountPopover = (props) => {
  const authenticatedUser = JSON.parse(window.sessionStorage.getItem('user'));
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );

  const handleAccount = useCallback(
      () => {
        router.push('/account');
      },
      [router]
    );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
    >
    <MenuList
            disablePadding
            dense
            sx={{
              p: '8px',
              '& > *': {
                borderRadius: 1
              }
            }}
          >
       {authenticatedUser && (
       <MenuItem onClick={handleAccount}>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {authenticatedUser.name} {authenticatedUser.lastname}
        </Typography>
        </MenuItem>
         )}
      <Divider />
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
