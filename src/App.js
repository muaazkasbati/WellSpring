import logo from './logo.svg';
import Layout from './components/Layout/Layout';
import ContextProvider from "./context/context"

function App() {
  console.log('aaaaa')
  return (
    <ContextProvider >
      <Layout />
    </ContextProvider>
  );
}

export default App;
