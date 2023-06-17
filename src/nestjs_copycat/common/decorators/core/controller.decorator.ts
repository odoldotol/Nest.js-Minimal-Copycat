import {
  CONTROLLER_WATERMARK,
  PATH_METADATA,
} from '../../constants';

export function Controller(prefixOrOptions?: string): ClassDecorator {
  const defaultPath = '/';
  const path = prefixOrOptions ? prefixOrOptions : defaultPath;

  return (target: object) => {
    Reflect.defineMetadata(CONTROLLER_WATERMARK, true, target);
    Reflect.defineMetadata(PATH_METADATA, path, target);
  };
}