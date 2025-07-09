import './App.css';
import AboutPage from './pages/page.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import Landing from './pages/landing.tsx';
import Hero from './pages/hero.tsx';
import Projects from './pages/projects.tsx';
import AuroraBackground from '../components/aurora-background.tsx';
import Footer from '../components/Footer.tsx';

function App() {
	return (
		<Router>
			<AuroraBackground>
				<Navbar options={['About', 'Projects']} />
				<Routes>
					<Route path='' element={<Landing />}></Route>
					<Route path='/about' element={<Hero />}></Route>
					<Route path='/projects' element={<Projects />}></Route>
				</Routes>
				<Footer />
			</AuroraBackground>
		</Router>
	);
}

export default App;
