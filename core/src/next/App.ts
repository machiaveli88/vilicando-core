import NextApp from 'next/app';
import { ApolloClient } from 'apollo-client';

interface IApp<TCacheShape> {
  apollo?: ApolloClient<TCacheShape>;
}

export default abstract class App<TCacheShape = any> extends NextApp<
  IApp<TCacheShape>
> {}
