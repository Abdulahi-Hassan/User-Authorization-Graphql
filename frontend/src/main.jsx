import { createRoot } from "react-dom/client";
import App from "./App";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./Apollo-Client";

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(

<ApolloProvider client={client}>
<BrowserRouter>
<App/>
</BrowserRouter>
</ApolloProvider>

);
