import { HiMapPin, HiAcademicCap, HiCodeBracket } from 'react-icons/hi2';
import { GiSoccerBall } from 'react-icons/gi';

const FACTS = [
	{ Icon: HiMapPin, label: 'Tokyo, Japan' },
	{ Icon: HiAcademicCap, label: 'Waseda Uni' },
	{ Icon: HiCodeBracket, label: 'Systems & data' },
	{ Icon: GiSoccerBall, label: 'Footballer' }
];

export default function Hero() {
	return (
		<section className='mx-auto max-w-6xl px-6 py-16 font-mono lg:py-24'>
			<div className='grid items-start gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-14'>
				<div className='mx-auto w-full max-w-xs lg:sticky lg:top-28 lg:max-w-none'>
					<div className='relative'>
						<div className='absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-accent-strong/25 via-accent-soft/10 to-transparent blur-2xl' />
						<img
							src='/hero.png'
							alt='Alex portrait'
							className='w-full rounded-3xl border border-white/10 object-cover shadow-2xl shadow-black/50'
						/>
					</div>
					<ul className='mt-6 grid grid-cols-2 gap-2 text-xs text-zinc-300'>
						{FACTS.map(({ Icon, label }) => (
							<li
								key={label}
								className='glass flex items-center gap-2 rounded-lg px-3 py-2'
							>
								<Icon className='h-4 w-4 shrink-0 text-accent' />
								<span className='truncate'>{label}</span>
							</li>
						))}
					</ul>
				</div>

				<div>
					<span className='text-xs font-semibold uppercase tracking-[0.25em] text-accent'>About me</span>
					<h2 className='mt-3 text-3xl font-extrabold text-white sm:text-4xl xl:text-5xl'>
						Hey there, I'm Alex!
					</h2>
					<h3 className='mt-2 text-lg text-zinc-400 sm:text-xl'>Computer Science Student</h3>

					<div className='mt-8 space-y-5 text-sm leading-relaxed text-zinc-300 sm:text-base'>
						<p>
							I'm an exchange student studying CS at Waseda University in Tokyo, Japan. I love turning
							complex ideas into elegant software solutions that make a real impact.
						</p>
						<p>
							I'm passionate about solving meaningful problems through technology, prioritising data-driven
							decision making and scalable solutions.
						</p>
						<p>
							My passion for programming took off after a Python pandas workshop in my first year. I
							realised coding isn't just syntax that lives in the terminal, but rather a tool for innovative
							problem solving.
						</p>
						<p>
							Outside academics, football has taught me teamwork, resilience and discipline through a
							commitment to a collective team vision and a desire to improve as a player. Over a decade in
							the sport has shaped my mindset and helped me forge friendships across continents.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
