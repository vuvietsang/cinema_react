import Header from './components/Header/Header';
import './App.css';
import SimpleBottomNavigation from './components/NavBar/NavBar';
import { Container } from '@material-ui/core';
import { Route, Switch } from 'react-router';
import Trending from './Pages/Trending';
import Movies from './Pages/Movies';
import Series from './Pages/Series';
import Search from './Pages/Search';


function App() {
  return (
    <>
      <Header />
      <div className='app'>
        <Container>
          <Switch>
            <Route path='/' component={Trending} exact />
            <Route path='/movies' component={Movies} />
            <Route path='/series' component={Series} />
            <Route path='/search' component={Search} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </>
  );
}

export default App;
