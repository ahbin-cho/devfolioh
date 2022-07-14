import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from '@styles/GlobalStyles';
import Root from '@pages/Root';

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Root />
    </BrowserRouter>
  );

}

export default App;
