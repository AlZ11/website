import { Link } from 'react-router-dom';

export default function Hero() {
	return (
		<section className='flex flex-row justify-center items-center font-mono'>
			<div className='flex-wrap'>
				<h1 className='text-8xl font-extrabold'>Hey there, I'm Alex!</h1>
				<h3 className='text-4xl py-10'>Computer Science Student</h3>
				<div className='text-3xl flex-wrap mx-45 tracking-wide'>
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
					<br></br>
					<p>
						Football for me has helped foster a more global mindset, enabling me to build connections across continents,
						transcending cultural and language barriers.
					</p>
				</div>
			</div>
			<img src='hero.png' alt='Alex image' className='w-1/2 max-h-fit z-10 object-contain px-40 pt-40'></img>
		</section>
	);
}
