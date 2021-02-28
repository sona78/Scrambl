import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Service {
  readonly id: string;
  readonly service: string;
  readonly username: string;
  readonly password: string;
  readonly userID?: string;
  constructor(init: ModelInit<Service>);
  static copyOf(source: Service, mutator: (draft: MutableModel<Service>) => MutableModel<Service> | void): Service;
}

export declare class User {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly resume?: string;
  readonly username: string;
  readonly Services?: (Service | null)[];
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}