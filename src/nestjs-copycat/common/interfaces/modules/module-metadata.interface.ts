import { Type } from "../type.interface";

export interface ModuleMetadata {

  imports?: Type<any>[];

  controllers?: Type<any>[];

  providers?: Type<any>[];

  exports?: Array<
    | string
    | symbol
    | Type<any>
    | Function
  >;
}