import React, { useCallback } from 'react';
import { Box } from 'grommet';
import { Button } from '../../Base';
import { useStores } from '../../../stores';
import { observer } from 'mobx-react-lite';

export const SignInButton: React.FC = observer(() => {
  const { userStore } = useStores();

  const handleOpenModal = useCallback(() => {
    userStore.openConnectWalletModal();
  }, [userStore]);

  // const handleSignOut = useCallback(() => {
  //   user.signOut();
  // }, [user]);

  return null;

  return (
    <Box>
      {!userStore.isAuthorized && (
        <Button
          fontSize="16px"
          style={{ padding: '10px' }}
          onClick={handleOpenModal}
        >
          Connect wallet
        </Button>
      )}
      {/*{user.isAuthorized && (*/}
      {/*  <Button*/}
      {/*    bordered*/}
      {/*    style={{ padding: '10px' }}*/}
      {/*    transparent*/}
      {/*    fontSize="16px"*/}
      {/*    onClick={handleSignOut}*/}
      {/*  >*/}
      {/*    Logout*/}
      {/*  </Button>*/}
      {/*)}*/}
    </Box>
  );
});

SignInButton.displayName = 'SignInButton';
