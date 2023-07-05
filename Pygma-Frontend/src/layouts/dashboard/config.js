import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import HandThumbUpIcon from '@heroicons/react/24/solid/HandThumbUpIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import RocketLaunchIcon from '@heroicons/react/24/solid/RocketLaunchIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Apply to PY4',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <RocketLaunchIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  }
];
