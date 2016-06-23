import { injectable, KernelModule, interfaces } from 'inversify';

import { IInjector, IUserModule } from './interfaces';

import { IUserService, IUserServiceConstructor } from 'retax-core';
import { generateRandomId } from 'retax-utils';

@injectable()
export default class Injector implements IInjector {
  private _userModules: Map<IUserServiceConstructor|IUserServiceConstructor[], IUserModule> =
    new Map<IUserServiceConstructor|IUserServiceConstructor[], IUserModule>();

  get userModules(): IUserModule[] {
    const res: IUserModule[] = [];

    this._userModules.values();

    for (const userModule of this._userModules.values()) {
      res.push(userModule);
    }

    return res;
  }

  public registerService(Services: IUserServiceConstructor|IUserServiceConstructor[], name?: string): Symbol {
    let serviceId: Symbol;

    if (Services instanceof Array) {
      serviceId = Symbol(`UserService[] - ${name || generateRandomId()}`);
    } else {
      serviceId = Symbol(`UserService - ${name || generateRandomId()}`);
    }

    const kernelModule = this._createKernelModuleLoader(serviceId, Services);
    this._setUserModule(Services, serviceId, kernelModule);

    return serviceId;
  }

  private _setUserModule(
    key: IUserServiceConstructor|IUserServiceConstructor[],
    serviceId: Symbol,
    kernelModule: interfaces.KernelModule
  ): void {
    if (this._userModules.has(key)) {
      throw new Error(`Duplicate module for key ${key.toString()} of id ${serviceId}`);
    }

    this._userModules.set(key, { serviceId, kernelModule });
  }

  private _createKernelModuleLoader(id: Symbol, Services: IUserServiceConstructor|IUserServiceConstructor[]): interfaces.KernelModule {
    return new KernelModule((bind: interfaces.Bind) => {
      if (!Services || (Services instanceof Array && Services.length === 0)) { // we need to bind something for id.
        bind<IUserService>(id).toConstantValue(undefined);
      } else if (!(Services instanceof Array)) {
        bind<IUserService>(id).to(Services);
      } else {
        Services.forEach(Service => {
          bind<IUserService>(id).to(Service);
        });
      }
    });
  }
}
