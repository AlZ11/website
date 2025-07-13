export default function Hero() {
	return (
		<article className='font-mono leading-relaxed mx-auto max-w-7xl px-4 py-12 lg:flex lg:items-start lg:gap-8'>
			<img
				src='/hero.png'
				alt='Alex portrait'
				className='w-full shrink-0 rounded-b-[25%] shadow-lg mb-6 mx-auto max-w-xs
				md:max-w-sm md:float-left md:mr-6 md:h-1/3 md:w-1/3 md:mb-0
				lg:float-none lg:max-w-md lg:mr-0'
			/>

			<div className='flex-1'>
				<h2 className='mt-4 font-extrabold text-3xl sm:text-4xl md:mt-0 md:text-5xl xl:text-6xl'>
					Hey there, I'm Alex!
				</h2>
				<h3 className='my-4 text-lg sm:text-xl md:text-2xl xl:text-3xl'>Computer&nbsp;Science&nbsp;Student</h3>
				<div className='space-y-6 text-sm sm:text-base md:text-lg xl:text-xl tracking-widest'>
					<p>
						I'm a Computer Science student at Monash University in Melbourne, Australia. I love turning complex ideas
						into elegant software solutions that make a real impact.
					</p>
					<p>
						I'm passionate about solving meaningful problems through technology, prioritising data-driven decision
						making and scalable solutions.
					</p>
					<p>
						My passion for programming took off after a Python pandas workshop in my first year. I realised coding isn't
						just syntax that lives in the terminal but rather a tool for innovative problem solving.
					</p>
					<p>
						Outside academics, football has taught me teamwork, resilience and discipline through a commitment to a
						collective team vision and desire to improve as a player. My experience in the sport for over a decade has
						shaped my mindset and helped me forge friendships across continents.
					</p>
				</div>
			</div>
		</article>
	);
}
