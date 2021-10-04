import './App.css';
import QuestionModal from './Placement/QuestionModal/QuestionModal';
import AppNavbar from './Navbar.js';
import QuestionPool from './Placement/QuestionPool';
import { Container } from 'react-bootstrap';
import {PlacementProvider} from './Placement/Context';
import { BrowserRouter, Route } from 'react-router-dom';
import Courses from './Courses/Courses';
import Home from './Home/Home';
import ReactAvailableTimes from './ReactAvailableTimes';
import Availability from './Availability/Availability';
import Login from './Components/Login/Login.js';
import useToken from './useToken.js';
import UserInfo from './Components/UserInfo/UserInfo';
import UserInfoExtended from './Components/UserInfo/UserInfoExtended';

function App() {
  const { token, setToken } = useToken();
  if(!token) {
    return (<BrowserRouter>
            <AppNavbar/>
            <Login setToken={setToken} />
            </BrowserRouter>);
  }
  const quizGenerator =(
    <Container className="rounded-lg mt-5 mb-5 bg-white">
    <h1 className="text-center text-dark">Quiz Generator</h1>
    <PlacementProvider token={token}>
    <QuestionModal token={token.token}/>
    <QuestionPool/>
    </PlacementProvider>
    </Container>
    );
  return (
    <BrowserRouter>
    <AppNavbar/>
    <UserInfo />
    <Route exact path="/UserProfile" render={()=><UserInfoExtended/>} />
    <Route exact path="/" render={()=><Home/>} />
    <Route exact path="/Courses" render={()=><Courses/>} />
    <Route path="/PlacementTest" render={()=>quizGenerator} />
    <Route path="/Availability" render={()=><ReactAvailableTimes/>} />
    <Route path="/Availability2" render ={()=><Availability/>} />
    </BrowserRouter>

  );
}

export default App;