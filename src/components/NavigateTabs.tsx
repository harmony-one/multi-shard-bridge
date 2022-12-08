import React from 'react';
import { LargeTab } from './LargeTab/LargeTab';
import { Box } from 'grommet';
import { useStores } from '../stores';
import { useRouteMatch, generatePath } from 'react-router';
import { routes } from '../constants/routePaths';

type Props = {};

export const NavigateTabs: React.FC<Props> = () => {
  const { routerStore } = useStores();

  const handleNavigate = (routePath: string) => () => {
    const path = generatePath(routePath);
    routerStore.push(path, {});
  };

  const { path } = useRouteMatch();

  const isActive = (path1: string, path2: string) => {
    return path1 === path2;
  };

  return (
    <Box
      fill="horizontal"
      direction="row"
      justify="between"
      gap="medium"
      margin={{ bottom: 'medium' }}
    >
      <LargeTab
        title="Issue"
        onClick={handleNavigate(routes.issue)}
        active={isActive(path, routes.issue)}
      />
      <LargeTab
        title="Redeem"
        onClick={handleNavigate(routes.redeem)}
        active={isActive(path, routes.redeem)}
      />
      <LargeTab
        title="Transfer"
        onClick={handleNavigate(routes.transfer)}
        active={isActive(path, routes.transfer)}
      />
    </Box>
  );
};
