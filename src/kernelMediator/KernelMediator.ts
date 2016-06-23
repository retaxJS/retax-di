import { injectable, inject, interfaces } from 'inversify';
import { IInversifyKernelFacade } from 'retax-core';

import { IKernelMediator } from './interfaces';

import { IKernelFactory } from '../kernelFactory';
import { IInjector } from '../injector';

import {
  KERNEL_FACTORY,
  INJECTOR,
} from '../inversify/identifiers';

@injectable()
export default class KernelMediator implements IKernelMediator {
  constructor(
    @inject(KERNEL_FACTORY) private _kernelFactory: IKernelFactory,
    @inject(INJECTOR) private _injector: IInjector
  ) {}

  public create(modules: interfaces.KernelModule[]): IInversifyKernelFacade {
    const userModules = this._injector.userModules;

    return this._kernelFactory.create(modules, userModules);
  }

  public reload(kernelFacade?: IInversifyKernelFacade): void {
    if (kernelFacade) {
      const userModules = this._injector.userModules;

      kernelFacade.loadModules(userModules);
    }
  }
}
