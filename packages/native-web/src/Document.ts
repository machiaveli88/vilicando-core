import {
  Document as NextDocument,
  DocumentContext,
  DocumentInitialProps,
  Main
} from "vilicando-core";
import { AppRegistry } from "react-native";

export default abstract class Document extends NextDocument {
  static async getInitialProps(
    props: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await NextDocument.getInitialProps(props);

    // todo: name => variable!
    AppRegistry.registerComponent("name", () => Main);
    // @ts-ignore
    const { getStyleElement } = AppRegistry.getApplication(config.name);

    return { ...initialProps, styles: getStyleElement() };
  }
}
