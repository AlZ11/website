import { SiGithub, SiLinkedin, SiGmail } from 'react-icons/si';
import { Link } from 'react-router-dom';

const SOCIALS = [
	{ href: 'https://github.com/alz11', label: 'GitHub', Icon: SiGithub },
	{ href: 'https://linkedin.com/in/alexzhang7', label: 'LinkedIn', Icon: SiLinkedin },
	{ href: 'mailto:alexanderzhang950@gmail.com', label: 'Email', Icon: SiGmail }
];

export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className='mt-16 border-t border-white/10 font-mono'>
			<div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row'>
				<Link to='/' className='text-sm font-bold text-white transition-colors hover:text-accent'>
					AlZ11
				</Link>

				<span className='order-last text-xs text-zinc-500 sm:order-none'>
					© {year} Alex Zhang · Built with React &amp; Tailwind
				</span>

				<div className='flex items-center gap-2'>
					{SOCIALS.map(({ href, label, Icon }) => {
						const external = href.startsWith('http');
						return (
							<a
								key={label}
								href={href}
								target={external ? '_blank' : undefined}
								rel={external ? 'noopener noreferrer' : undefined}
								aria-label={label}
								className='grid h-9 w-9 place-items-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-white/25 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
							>
								<Icon className='h-4 w-4' />
							</a>
						);
					})}
				</div>
			</div>
		</footer>
	);
}
