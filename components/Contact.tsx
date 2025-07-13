import { SiGmail, SiGithub, SiLinkedin } from 'react-icons/si';

type BtnProps = {
	href: string;
	label: string;
	Icon: React.ComponentType<{ className?: string }>;
	color: string;
};

function ContactButton({ href, label, Icon, color }: BtnProps) {
	const external = href.startsWith('http');
	return (
		<a
			href={href}
			target={external ? '_blank' : undefined}
			rel={external ? 'noopener noreferrer' : undefined}
			aria-label={label}
			className={`flex items-center gap-5 rounded-lg px-4 py-2 text-white ${color}
                  hover:scale-110 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2`}
		>
			<Icon className='sm:h-6 sm:w-6 lg:h-5 lg:w-5' />
			<span>{label}</span>
		</a>
	);
}

export default function ContactSection() {
	return (
		<section id='#contact' className='flex flex-col items-center gap-6 py-16 font-mono text-center'>
			<h2 className='text-xl font-bold'>Contact me!</h2>

			<p className='max-w-lg text-xs sm:text-md 2xl:text-lg text-muted-foreground'>
				Feel free to reach out for anything!&nbsp;👋
			</p>

			<div className='flex flex-wrap justify-center gap-4'>
				<ContactButton href='mailto:alexanderzhang950@gmail.com' label='Email' Icon={SiGmail} color='bg-red-500' />
				<ContactButton href='https://github.com/alz11' label='GitHub' Icon={SiGithub} color='bg-gray-800' />
				<ContactButton
					href='https://linkedin.com/in/alexzhang7'
					label='LinkedIn'
					Icon={SiLinkedin}
					color='bg-blue-600'
				/>
			</div>
		</section>
	);
}
