import { RouteNode, Router } from '../modules/router';
import { InferValueTypes } from '../utils/types';

export enum ROUTE_NAMES {
  HOME = 'home',
  BRIDGE = 'bridge',
  BRIDGE_ISSUE = 'issue',
  BRIDGE_REDEEM = 'redeem',
  BRIDGE_TRANSFER = 'transfer',
  BRIDGE_BURN = 'burn',
  TRANSACTIONS = 'transactions',
  MY_VAULT = 'myVault',
  DASHBOARD = 'dashboard',
  DASHBOARD_RELAY = 'dashboardRelay',
  DASHBOARD_ISSUES = 'dashboardIssue',
  DASHBOARD_REDEEMS = 'dashboardRedeem',
  DASHBOARD_VAULT_LIST = 'dashboardVault',
  DASHBOARD_VAULT_DETAIL = 'dashboardVaultDetails',
  HELP = 'help',
  SUPPORT = 'support',
  ADMIN_HOME = 'adminHome',
}

const routeTree: RouteNode<ROUTE_NAMES> = {
  name: ROUTE_NAMES.HOME,
  path: '/',
  children: [
    {
      name: ROUTE_NAMES.BRIDGE,
      path: '/bridge',
      children: [
        {
          name: ROUTE_NAMES.BRIDGE_ISSUE,
          path: '/bridge/issue/:issueId?/:modal(deposit|details)?',
        },
        {
          name: ROUTE_NAMES.BRIDGE_REDEEM,
          path: '/bridge/redeem/:redeemId?/:modal(withdraw|details)?',
        },
        {
          name: ROUTE_NAMES.BRIDGE_TRANSFER,
          path: '/bridge/transfer',
        },
        {
          name: ROUTE_NAMES.BRIDGE_BURN,
          path: '/bridge/burn',
        },
      ],
    },
    {
      name: ROUTE_NAMES.TRANSACTIONS,
      path: '/transactions',
    },
    {
      name: ROUTE_NAMES.MY_VAULT,
      path: '/myVault',
    },
    {
      name: ROUTE_NAMES.DASHBOARD,
      path: '/dashboard',
      children: [
        {
          name: ROUTE_NAMES.DASHBOARD_RELAY,
          path: '/dashboard/relay',
        },
        {
          name: ROUTE_NAMES.DASHBOARD_ISSUES,
          path: '/dashboard/issues/:issueId?',
        },
        {
          name: ROUTE_NAMES.DASHBOARD_REDEEMS,
          path: '/dashboard/redeem/:redeemId?',
        },
        {
          name: ROUTE_NAMES.DASHBOARD_VAULT_LIST,
          path: '/dashboard/vaults',
        },
        {
          name: ROUTE_NAMES.DASHBOARD_VAULT_DETAIL,
          path: '/dashboard/vaults/:vaultId',
        },
      ],
    },
    {
      name: ROUTE_NAMES.HELP,
      path: '/help',
    },
    {
      name: ROUTE_NAMES.SUPPORT,
      path: '/support',
    },
    {
      name: ROUTE_NAMES.ADMIN_HOME,
      path: '/admin',
    },
  ],
};

export const router = new Router(routeTree);

export const routes = router.getFlatMap();

export type RoutePaths = InferValueTypes<typeof routes>;
