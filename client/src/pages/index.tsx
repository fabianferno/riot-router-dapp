import Dashboard from 'components/Dashboard';
import { Default } from 'components/layouts/Default';
import NoSSR from 'components/NoSSR';
import { Home } from 'components/templates/home';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

const HomePage: NextPage = () => {
  const { address } = useAccount();

  return (
    <Default pageName="Home">
      {address != '0x' ? (
        <NoSSR>
          <Dashboard />
        </NoSSR>
      ) : (
        <Home />
      )}
    </Default>
  );
};

export default HomePage;
