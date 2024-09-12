declare module 'swc-loader' {
  import { LoaderContext } from 'webpack';

  function loader(this: LoaderContext<any>, contents: string, inputSourceMap?: Record<string, any>): void;
  export = loader;
}
