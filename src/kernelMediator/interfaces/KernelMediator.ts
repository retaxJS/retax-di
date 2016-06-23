import { interfaces } from 'inversify';

import { IInversifyKernelFacade } from 'retax-core';

export interface IKernelMediator {
  create(modules: interfaces.KernelModule[]): IInversifyKernelFacade;
  reload(kernelFacade?: IInversifyKernelFacade): void;
}
