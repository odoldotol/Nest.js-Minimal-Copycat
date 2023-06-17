// import { uid } from 'uid';
import { INJECTABLE_WATERMARK, SCOPE_OPTIONS_METADATA } from '../../constants';
// import { Type } from '../../interfaces/type.interface';

export function Injectable(): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target);
  };
}

// export function mixin<T>(mixinClass: Type<T>) {
//   Object.defineProperty(mixinClass, 'name', {
//     value: uid(21),
//   });
//   Injectable()(mixinClass);
//   return mixinClass;
// }