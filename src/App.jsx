import './App.css';
import NewsletterForm from './components/NewsletterForm';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/:userId/:newsletterId" element={<NewsletterForm/>}/>
            </Routes>
        </Router>
    );
}

export default App;