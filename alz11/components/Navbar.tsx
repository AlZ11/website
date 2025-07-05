import { Link } from 'react-router-dom';

export default function Navbar() {
	const OPTIONS = ['About', 'Projects', 'Resume', 'Github', 'LinkedIn'];
	return (
		<>
			<nav>
				<header>Alex Zhang</header>
				<ul>
					{OPTIONS.map((item) => (
						<li>{<Link to={`/${item.toLowerCase()}`}>{item}</Link>}</li>
					))}
				</ul>
			</nav>
		</>
	);
}
