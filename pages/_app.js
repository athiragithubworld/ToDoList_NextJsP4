import ToDoProvider from "@/components/store/ToDoProvider";
import "../styles/globals.css";
import Layout from "@/components/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ToDoProvider>
        <Component {...pageProps} />
      </ToDoProvider>
    </Layout>
  );
}

export default MyApp;
