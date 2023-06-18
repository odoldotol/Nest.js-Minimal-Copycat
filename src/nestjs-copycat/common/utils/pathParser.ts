export const pathParser = (path: string): string => {
  return trimEndSlash(unifySlashed(startWithSingleSlash(path)));
}

const startWithSingleSlash = (str: string) => str.replace(/^\/?/, "/");

const unifySlashed = (str: string) => str.replace(/\/{2,}/g, "/");

const trimEndSlash = (str: string) => str.replace(/([^\/])\/$/, "$1");