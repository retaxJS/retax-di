import { IKernelModule } from 'inversify';

import { IInversifyKernelFacade } from 'retax-core';

export interface IKernelMediator {
  create(modules: IKernelModule[]): IInversifyKernelFacade;
  reload(kernelFacade?: IInversifyKernelFacade): void;
}
