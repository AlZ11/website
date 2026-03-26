export default function Footer() {
	const d = new Date();
	return (
		<footer className='fixed inset-x-0 bottom-0 text-md text-gray-300 font-mono'>
			<span>© {d.getFullYear()} Alex Zhang</span>
		</footer>
	);
}
