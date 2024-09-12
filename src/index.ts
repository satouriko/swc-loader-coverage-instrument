import swcLoader from 'swc-loader';
import { LoaderContext } from 'webpack';

export = function loader(this: LoaderContext<any>, contents: string, inputSourceMap?: Record<string, any>) {
  const thisProxy = new Proxy(this, {
    get(target, p, receiver) {
      if (p === 'getOptions') {
        return () => {
          const options = JSON.parse(JSON.stringify(target.getOptions()));
          const plugins = options?.jsc?.experimental?.plugins;
          if (plugins) {
            for (let i = 0; i < plugins.length; i++) {
              const plugin = plugins[i];
              if (typeof plugin[0] === 'string' && plugin[0].match('swc-plugin-coverage-instrument')) {
                plugin[1] = { inputSourceMap, ...plugin[1] };
              }
            }
          }
          return options;
        };
      }
      return Reflect.get(target, p, receiver);
    },
  });
  return swcLoader.call(thisProxy, contents, inputSourceMap);
}
