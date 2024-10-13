// import logo from './logo.svg';
import './App.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Main from '../Main/Main.jsx';
import '../../fonts/fonts.css'

function App() {
  // user контекст
  // user объект
  // перенести массив Tasks и добавить его к user
  return (
    <div className="App">
      <Header/>
      <Main/> 
      <Footer/>
    </div>
  );
}

export default App;
