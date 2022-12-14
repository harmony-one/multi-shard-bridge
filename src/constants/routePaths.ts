import { RouteNode, Router } from '../modules/router';
import { InferValueTypes } from '../utils/types';

export enum ROUTE_NAMES {
  HOME = 'home',
}

const routeTree: RouteNode<ROUTE_NAMES> = {
  name: ROUTE_NAMES.HOME,
  path: '/',
  children: [],
};

export const router = new Router(routeTree);

export const routes = router.getFlatMap();

export type RoutePaths = InferValueTypes<typeof routes>;
