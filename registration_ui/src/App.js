import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentFormPage from './components/StudentFormPage';
import './App.css';
import {store} from "./actions/store";
import { Provider } from "react-redux"
import Students from './components/Students';
import { Container } from '@material-ui/core';
import {ToastProvider } from "react-toast-notifications"
function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
            <Routes>
              <Route path="/student-form" element={<StudentFormPage />} />
              <Route path="/" element={<Students />} />
            </Routes>
        </Container>
      </ToastProvider>
    </Provider>
    );
  }

export default App;
