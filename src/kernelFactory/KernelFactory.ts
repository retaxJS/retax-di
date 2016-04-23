import { injectable, inject, IKernelModule, IFactory } from 'inversify';
import { IInversifyKernelFacade } from 'retax-core';

import { IKernelFactory } from './interfaces';

import { IUserModule } from '../injector';

import {  INVERSIFY_KERNEL_FACADE_FACTORY } from '../inversify/identifiers';

@injectable()
export default class KernelFactory implements IKernelFactory {
  constructor(
    @inject(INVERSIFY_KERNEL_FACADE_FACTORY) private _kernelFactory: IFactory<IInversifyKernelFacade>
  ) {}

  /**
   * Create a new IoC container.
   * All user registered module will be included
   */
  public create(modules: IKernelModule[], userModules: IUserModule[]): IInversifyKernelFacade {
    const kernelFacade = this._kernelFactory();

    kernelFacade.loadKernelModules(modules);
    kernelFacade.loadModules(userModules);

    return kernelFacade;
  }
}
