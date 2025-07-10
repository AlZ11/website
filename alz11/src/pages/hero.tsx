export default function Hero() {
	return (
		<article
			className='
		font-sans leading-relaxed 
		mx-auto mt-20 ml-20 mr-20
		lg:flex lg:items-start 
		xl:gap-6'
		>
			<img
				src='hero.png'
				alt='Alex portrait'
				className='
			mb-3 mr-4 float-left 
			md:mb-0 md:mr-0 md:w-1/3 md:h-1/3
			lg:w-1/2 lg:h-1/2
			xl:float-none
			shrink-0'
			/>

			<div className='grow font-mono xl:translate-y-20'>
				<h2 className='mb-4 text-5xl font-extrabold leading-tight md:mt-0 2xl:text-6xl'>Hey there, I'm Alex!</h2>
				<h3 className='my-5 text-2xl 2xl:text-3xl'>Computer Science Student</h3>
				<div className='tracking-widest text-l 2xl:text-3xl'>
					<p>
						I'm a Computer Science student at Monash University in Melbourne, Australia. I love turning complex ideas
						into elegant software solutions that make a real impact.
					</p>
					<br />
					<p>
						I'm passionate about solving meaningful problems through technology, prioritising data driven decision
						making and scalable solutions.
					</p>
					<br />
					<p>
						My passion for programming really kicked off following a Python pandas workshop I attended during my first
						year of university. I realized that coding isn't just about syntax but rather a tool for solving problems in
						an innovative way.
					</p>
					<br />
					<p>
						Outside of academics, I have a deep passion for football, both as a player and a fan. I was introduced to
						the sport a decade ago, since then I have learnt valuable life lessons I live by everyday. Through football,
						I've been able to refine my teamwork, resilience and discipline through a commitment to a collective team
						vision and desire to improve as a player.
					</p>
					<br />
					<p>
						Football for me has helped foster a more global mindset, enabling me to build connections across continents,
						transcending cultural and language barriers.
					</p>
				</div>
			</div>
		</article>
	);
}
