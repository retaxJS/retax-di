import { interfaces } from 'inversify';

import { IUserServiceConstructor } from 'retax-core';

export interface IUserModule {
  serviceId: Symbol;
  kernelModule: interfaces.KernelModule;
}

export interface IInjector {
  userModules: IUserModule[];

  registerService(Service: IUserServiceConstructor, name?: string): Symbol;
  registerService(Services: IUserServiceConstructor[], name?: string): Symbol;
}




