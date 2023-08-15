import { Container } from 'react-bootstrap'
import logo from './logo.svg';
import './App.css';
// import components
import Book from './components/Book';

function App() {
  return (
    <Container className='py-3 mt-3 text-white cuscontain'>
      <h1 className='text-center mb-3'>Books</h1>
      <hr></hr>
      <Book></Book>
    </Container>
  );
}

export default App;
