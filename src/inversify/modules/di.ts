import { interfaces, KernelModule } from 'inversify';

import { InversifyKernelFacade } from 'retax-core/lib/inversifyKernelFacade';
import { INVERSIFY_KERNEL_FACADE } from 'retax-core/lib/inversify/identifiers';
import {
  IInversifyKernelFacade,
} from 'retax-core';

import { IKernelFactory, KernelFactory } from '../../kernelFactory';
import { IInjector, Injector } from '../../injector';
import { IKernelMediator, KernelMediator } from '../../kernelMediator';

import {
  INVERSIFY_KERNEL_FACADE_FACTORY,
  KERNEL_FACTORY,
  INJECTOR,
  KERNEL_MEDIATOR,
} from '../identifiers';

export default new KernelModule((bind: interfaces.Bind) => {
  bind<IInversifyKernelFacade>(INVERSIFY_KERNEL_FACADE).to(InversifyKernelFacade);
  bind<IKernelFactory>(KERNEL_FACTORY).to(KernelFactory).inSingletonScope();
  bind<IKernelMediator>(KERNEL_MEDIATOR).to(KernelMediator).inSingletonScope();
  bind<IInjector>(INJECTOR).to(Injector).inSingletonScope();

  bind<interfaces.Factory<IInversifyKernelFacade>>(INVERSIFY_KERNEL_FACADE_FACTORY).toAutoFactory(INVERSIFY_KERNEL_FACADE);
});

