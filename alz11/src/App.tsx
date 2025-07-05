import './App.css';
import LOL from '../components/testComponents.tsx';
import AboutPage from './about/page.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<Router>
			<AboutPage />
		</Router>
	);
}

export default App;
