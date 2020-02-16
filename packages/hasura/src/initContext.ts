import { NextPageContext } from 'next';
import { AppContext as NextAppContext } from 'next/app';
import initApolloClient from './apolloClient';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

interface ICtx extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  apolloState: NormalizedCacheObject;
}

interface IExtend extends ICtx {
  ctx?: IContext;
}

interface PageContext extends NextPageContext, IExtend {}
interface AppContext extends Omit<NextAppContext, 'ctx'>, IExtend {}

export type IContext = PageContext | AppContext;

/**
 * Installes the apollo client on NextPageContext
 * or NextAppContext. Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerProps
 * @param {PageContext | AppContext} ctx
 */
export default function initContext(ctx: IContext) {
  const inAppContext = Boolean(ctx.ctx);

  // We consider installing `withApollo({ ssr: true })` on global App level
  // as antipattern since it disables project wide Automatic Static Optimization.
  if (process.env.NODE_ENV === 'development' && inAppContext)
    console.warn(
      'Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n' +
        'Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n'
    );

  // Initialize ApolloClient if not already done
  const apolloClient =
    ctx.apolloClient ||
    initApolloClient(ctx.apolloState || {}, inAppContext ? ctx.ctx : ctx);

  // To avoid calling initApollo() twice in the server we send the Apollo Client as a prop
  // to the component, otherwise the component would have to call initApollo() again but this
  // time without the context, once that happens the following code will make sure we send
  // the prop as `null` to the browser
  // @ts-ignore
  apolloClient.toJSON = () => null;

  // Add apolloClient to NextPageContext & NextAppContext
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.
  ctx.apolloClient = apolloClient;
  if (inAppContext) ctx.ctx.apolloClient = apolloClient;

  return ctx;
}
