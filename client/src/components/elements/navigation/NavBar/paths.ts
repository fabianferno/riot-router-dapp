import { ISubNav } from '../SubNav/SubNav';
import { useSelector } from 'react-redux';

export default function getNavLinks() {
  const { currentChain, currentAccount } = useSelector((state: any) => state.metamask);
  return currentAccount == ''
    ? []
    : [
        // {
        //   label: 'Home',
        //   href: '/mint-device',
        // },
        // {
        //   label: 'Profile',
        //   href: '/view-data',
        // },
      ];
}
