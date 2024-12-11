import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd"
import fr from "antd/locale/fr_FR"
import dayjs from "dayjs"
import "dayjs/locale/fr"
dayjs.locale("fr")

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ConfigProvider locale={fr}>
        <App />
      </ConfigProvider>
    </ApolloProvider>
  </BrowserRouter>
);
