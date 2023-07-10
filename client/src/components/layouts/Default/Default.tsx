import { FC, ReactNode, useEffect } from 'react';
import { Container } from '@chakra-ui/react';
import { Footer, Header } from 'components/modules';
import Head from 'next/head';
import { useColorModeValue } from '@chakra-ui/react';
import { EmbedSDK } from '@pushprotocol/uiembed';
import { useSelector } from 'react-redux';

const Default: FC<{ children: ReactNode; pageName: string }> = ({ children, pageName }) => {
  const { currentAccount } = useSelector((state: any) => state.metamask);

  const bgColor = useColorModeValue('blackAlpha.200', 'blackAlpha.500');
  // const textColor = useColorModeValue("#000000", "#FFFFFF");
  useEffect(() => {
    if (currentAccount) {
      // 'your connected wallet address'
      EmbedSDK.init({
        headerText: 'Riot Alerts - powered by Push', // optional
        targetID: 'sdk-trigger-id', // mandatory
        appName: 'the-riot-protocol', // mandatory
        user: currentAccount, // mandatory
        chainId: 314159, // mandatory
        viewOptions: {
          type: 'sidebar', // optional [default: 'sidebar', 'modal']
          showUnreadIndicator: true, // optional
          unreadIndicatorColor: '#cc1919',
          unreadIndicatorPosition: 'bottom-right',
        },
        theme: 'dark',
        onOpen: () => {
          console.log('-> client dApp onOpen callback');
        },
        onClose: () => {
          console.log('-> client dApp onClose callback');
        },
      });
    }

    return () => {
      EmbedSDK.cleanup();
    };
  }, []);
  return (
    <>
      <Head>
        <title>{`${pageName} | the-riot-protocol`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script async src="https://saturn.tech/widget.js"></script>
      </Head>
      <Header />
      <Container
        maxW="container.xl"
        borderRadius={40}
        bg={bgColor}
        p={3}
        marginTop={50}
        as="main"
        minH="70vh"
        padding={10}
      >
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Default;
