import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import Landing from './pages/landing.tsx';
import Hero from './pages/hero.tsx';
import Projects from './pages/projects.tsx';
import AuroraBackground from '../components/aurora-background.tsx';
import Footer from '../components/Footer.tsx';
import Map from './pages/map.tsx';
import BlogIndex from './pages/blog-index.tsx';
import BlogPostPage from './pages/blog-post.tsx';
import AnimatedRoutes from '../components/Transition.tsx';

const PATH = ['', '/about', '/projects', '/map', '/blog', '/blog/:slug'];

function App() {
	return (
		<Router>
			<AuroraBackground>
				<Navbar options={['About', 'Projects', 'Map', 'Blog']} />
				<AnimatedRoutes paths={PATH}>
					<Landing />
					<Hero />
					<Projects />
					<Map />
					<BlogIndex />
					<BlogPostPage />
				</AnimatedRoutes>
				<Footer />
			</AuroraBackground>
		</Router>
	);
}

export default App;
