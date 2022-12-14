import * as React from 'react';
import { Box } from 'grommet';
import TransferForm from './components/TransferForm/TransferForm';
import { BaseLayout } from '../../components/Layouts/BaseLayout';
import { BridgeContentContainer } from '../../components/BridgeContentContainer';
import { BridgeFormsSurface } from '../../components/BridgeFormsSurface';
import { NetworkRow } from './components/NetworkRow';
import { MetamaskButton } from '../../components/MetamaskButton';
import { observer } from 'mobx-react';
import { useStores } from '../../stores';
import { useCallback } from 'react';
import { WalletNetworkWarn } from './components/WalletNetworkWarn';

export const TransferPage = observer(() => {
  const { userStore } = useStores();

  const handleClickMetamask = useCallback(() => {
    if (userStore.isAuthorized) {
      // return userMetamask.signOut();
    }

    return userStore.signInMetamask();
  }, [userStore]);

  return (
    <BaseLayout>
      <Box align="center">
        <BridgeContentContainer>
          <BridgeFormsSurface gap="40px">
            <NetworkRow />
            {userStore.isAuthorized ? (
              // <Box
              //   direction="column"
              //   justify="center"
              //   align="center"
              //   gap="16px"
              //   pad={{ horizontal: '30px', vertical: '20px' }}
              // >
              <WalletNetworkWarn />
            ) : // </Box>
            null}

            {!userStore.isAuthorized ? (
              <Box
                direction="column"
                justify="center"
                pad={{ horizontal: '80px', vertical: '20px' }}
              >
                <MetamaskButton active={true} onClick={handleClickMetamask} />
              </Box>
            ) : null}

            <TransferForm />
          </BridgeFormsSurface>
        </BridgeContentContainer>
      </Box>
    </BaseLayout>
  );
});
