import { SiGmail, SiGithub, SiLinkedin } from 'react-icons/si';
import { HiArrowUpRight } from 'react-icons/hi2';

type BtnProps = {
	href: string;
	label: string;
	handle: string;
	Icon: React.ComponentType<{ className?: string }>;
	accent: string;
};

function ContactButton({ href, label, handle, Icon, accent }: BtnProps) {
	const external = href.startsWith('http');
	return (
		<a
			href={href}
			target={external ? '_blank' : undefined}
			rel={external ? 'noopener noreferrer' : undefined}
			aria-label={label}
			className='group glass flex items-center gap-4 rounded-2xl p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
		>
			<span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${accent}`}>
				<Icon className='h-5 w-5 text-white' />
			</span>
			<span className='min-w-0'>
				<span className='block text-sm font-semibold text-white'>{label}</span>
				<span className='block truncate text-xs text-zinc-400'>{handle}</span>
			</span>
			<HiArrowUpRight className='ml-auto text-zinc-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white' />
		</a>
	);
}

export default function ContactSection() {
	return (
		<section id='#contact' className='mx-auto max-w-3xl px-6 py-24 text-center font-mono'>
			<span className='text-xs font-semibold uppercase tracking-[0.25em] text-accent'>Contact</span>
			<h2 className='mt-3 text-3xl font-bold text-white sm:text-4xl'>Let's build something.</h2>
			<p className='mx-auto mt-4 max-w-lg text-sm text-zinc-400 sm:text-base'>
				Whether it's an opportunity, a project idea or just a chat about systems and football — my inbox is
				always open.&nbsp;👋
			</p>

			<div className='mt-10 grid gap-4 sm:grid-cols-3'>
				<ContactButton
					href='mailto:alexanderzhang950@gmail.com'
					label='Email'
					handle='Say hello'
					Icon={SiGmail}
					accent='bg-red-500/90'
				/>
				<ContactButton
					href='https://github.com/alz11'
					label='GitHub'
					handle='@alz11'
					Icon={SiGithub}
					accent='bg-zinc-700'
				/>
				<ContactButton
					href='https://linkedin.com/in/alexzhang7'
					label='LinkedIn'
					handle='in/alexzhang7'
					Icon={SiLinkedin}
					accent='bg-blue-600'
				/>
			</div>
		</section>
	);
}
