import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import App from './app/app';
import styled from '@emotion/styled';

const GridLayout = styled.section`
  background-color: antiquewhite;
  display: grid;
  height: 100%;
  grid-template:
    [row1-start] 'menubar header sidebar' auto [row1-end]
    [row2-start] 'menubar main sidebar' 1fr [row2-end]
    / auto 1fr auto;
`;



const HeaderArea = styled.nav`
  grid-area: header;
`;

const MainArea = styled.main`
  grid-area: main;
  margin-top: 10px;
  background-color: blue;
  padding-bottom: 5px;
`;

const GlobalDrawerArea = styled.nav`
  grid-area: sidebar;
  background: yellow;

`;

const Header = styled.div`
  background: red;
  height: 100px;
  width: 100vw;
`

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <GridLayout>

    <HeaderArea>
        <Header />
      </HeaderArea>
      <MainArea>
    <BrowserRouter>
    <App />
    </BrowserRouter>

      </MainArea>
      <GlobalDrawerArea>
        test
      </GlobalDrawerArea>

    </GridLayout>
  </StrictMode>
);
