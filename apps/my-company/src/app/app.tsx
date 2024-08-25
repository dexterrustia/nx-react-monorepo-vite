import { Route, Routes } from 'react-router-dom';

const Home = () => {
  return <>WELCOME HOME</>
}

const Employees = () => {
  return <>Employees HOME</>
}


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/employees' element={<Employees/>}></Route>
    </Routes>
  );
}

export default App;