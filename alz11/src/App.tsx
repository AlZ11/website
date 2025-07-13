import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import Landing from './pages/landing.tsx';
import Hero from './pages/hero.tsx';
import Projects from './pages/projects.tsx';
import AuroraBackground from '../components/aurora-background.tsx';
import Footer from '../components/Footer.tsx';
import Map from './pages/map.tsx';
import Page from '../components/Card.tsx';

function App() {
	return (
		<Router>
			<AuroraBackground>
				<Navbar options={['About', 'Projects', 'Map', 'Page']} />
				<Routes>
					<Route path='' element={<Landing />}></Route>
					<Route path='/about' element={<Hero />}></Route>
					<Route path='/projects' element={<Projects />}></Route>
					<Route path='/map' element={<Map />}></Route>
					<Route
						path='/page'
						element={
							<Page className='flex flex-col items-center justify-center'>
								<img
									className='h-full w-full absolute inset-0 object-cover'
									src='https://images.unsplash.com/photo-1512618831669-521d4b375f5d?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
								/>
							</Page>
						}
					></Route>
				</Routes>
				<Footer />
			</AuroraBackground>
		</Router>
	);
}

export default App;
