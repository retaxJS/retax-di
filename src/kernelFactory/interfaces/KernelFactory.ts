import { interfaces } from 'inversify';

import { IInversifyKernelFacade } from 'retax-core';
import { IUserModule } from '../../injector';

export interface IKernelFactory {
  /**
   * Create a new IoC container.
   * All user registered module will be included
   */
  create(modules: interfaces.KernelModule[], userModules: IUserModule[]): IInversifyKernelFacade;
}
