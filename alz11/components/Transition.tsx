import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Children } from 'react';

type RouteProps = {
	children: React.ReactNode;
	paths: Array<String>;
};

function PageTransition({ children }: { children: React.ReactNode }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.35, ease: 'easeInOut' }}
			className='min-h-screen'
		>
			{children}
		</motion.div>
	);
}

export default function AnimatedRoutes({ children, paths }: RouteProps) {
	const location = useLocation();

	return (
		<AnimatePresence mode='wait'>
			<Routes location={location} key={location.pathname}>
				{Children.toArray(children).map((child, i) => (
					<Route path={`${paths[i]}`} element={<PageTransition>{child}</PageTransition>}></Route>
				))}
			</Routes>
		</AnimatePresence>
	);
}
