import * as React from 'react';
import { action, observable } from 'mobx';
import { guid } from 'utils';
import { statusFetching } from '../constants';

export type ActionModalBody = (data: {
  actionData?: any;
}) => React.ComponentElement<{ onClose?: () => any; actionData?: any }, any>;

export interface ActionModalOptions {
  id?: string;
  width?: string;
  position?: 'flex-start' | 'center';
  title?: string;
  onApply: (data?: any) => Promise<any>;
  onClose?: (data?: any) => Promise<any>;
  applyText: string;
  closeText?: string;
  noValidation?: boolean;
  initData?: any;
  showOther?: boolean;
  isOverlayClose?: boolean;
}

export interface ActionModalConfig {
  id: string;
  render: ActionModalBody | any;
  options: ActionModalOptions;
  error?: string;
  actionStatus?: statusFetching;
}

export class ActionModalsStore {
  @observable public pool: Array<ActionModalConfig> = [];

  @action.bound
  public open = (
    render: ActionModalBody | any,
    options?: ActionModalOptions,
  ): Promise<any> => {
    const id = (options && options.id) || guid();

    const modalConfig: ActionModalConfig = { render, options, id };

    const deferPromise = new Promise((resolve, reject) => {
      const onApply = options.onApply;

      options.onApply = (data: any) =>
        onApply(data)
          .then(resolve)
          .then(() => this.close(id))
          .catch(err => {
            const currentModal = this.pool.find(m => m.id === id);

            if (currentModal) {
              currentModal.error = err.message;
            }

            reject(err);

            return Promise.reject(err);
          });

      const onClose = options.onClose || (() => Promise.resolve());

      options.onClose = () => {
        return onClose()
          .then(resolve)
          .then(() => this.close(id))
          .catch(err => {
            const currentModal = this.pool.find(m => m.id === id);

            if (currentModal) {
              currentModal.error = err.message;
            }

            reject(err);

            return Promise.reject(err);
          });
      };
    });

    if (modalConfig.options.showOther === false) {
      this.pool = [];
    }
    this.pool.push(modalConfig);

    return deferPromise;
  };

  @action.bound
  public close = (id: string) => {
    const modalConfig = this.pool.find(modal => modal.id === id);

    if (modalConfig) {
      this.pool = this.pool.filter(modal => modal.id !== id);
    }
  };

  @action.bound
  public closeLastModal = () => {
    this.close(this.pool[this.pool.length - 1].id);
  };

  @action.bound
  public closeAll() {
    this.pool = [];
  }

  @action.bound
  rejectError = (id: string, err: any, reject?: any) => {
    let message = err;
    if (err.message) {
      message = err.message;
    }
    this.pool.find(m => m.id === id).error = message;
    if (reject) reject();
    return Promise.reject(err);
  };
}
