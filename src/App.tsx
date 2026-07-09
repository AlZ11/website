import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import Landing from './pages/landing.tsx';
import Hero from './pages/hero.tsx';
import Projects from './pages/projects.tsx';
import AuroraBackground from '../components/aurora-background.tsx';
import Footer from '../components/Footer.tsx';
import Map from './pages/map.tsx';
import AnimatedRoutes from '../components/Transition.tsx';

const PATH = ['', '/about', '/projects', '/map'];

function App() {
	return (
		<Router>
			<AuroraBackground>
				<div className='relative z-10 flex min-h-screen flex-col'>
					<Navbar options={['About', 'Projects']} />
					<div className='flex-1'>
						<AnimatedRoutes paths={PATH}>
							<Landing />
							<Hero />
							<Projects />
							<Map />
						</AnimatedRoutes>
					</div>
					<Footer />
				</div>
			</AuroraBackground>
		</Router>
	);
}

export default App;
