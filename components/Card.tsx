import { cn } from '../lib/utils';
import { useRef, type PointerEvent } from 'react';

type CardProps = {
	children: React.ReactNode;
	className?: string;
	href?: string;
};

export default function Card({ children, className, href }: CardProps) {
	const elRef = useRef<HTMLElement | null>(null);
	const setRef = (el: HTMLElement | null) => {
		elRef.current = el;
	};

	const handleMove = (event: PointerEvent<HTMLElement>) => {
		const el = elRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const px = x / rect.width;
		const py = y / rect.height;
		el.style.setProperty('--mx', `${x}px`);
		el.style.setProperty('--my', `${y}px`);
		el.style.setProperty('--rx', `${(0.5 - py) * 5}deg`);
		el.style.setProperty('--ry', `${(px - 0.5) * 5}deg`);
	};

	const handleLeave = () => {
		const el = elRef.current;
		if (!el) return;
		el.style.setProperty('--rx', '0deg');
		el.style.setProperty('--ry', '0deg');
	};

	const Tag: React.ElementType = href ? 'a' : 'div';

	return (
		<Tag
			ref={setRef}
			href={href}
			target={href ? '_blank' : undefined}
			rel={href ? 'noopener noreferrer' : undefined}
			onPointerMove={handleMove}
			onPointerLeave={handleLeave}
			style={
				{
					'--mx': '50%',
					'--my': '50%',
					'--rx': '0deg',
					'--ry': '0deg'
				} as React.CSSProperties
			}
			className={cn(
				'group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-lg shadow-black/20 transition-[transform,border-color,box-shadow] duration-300 ease-out [transform:perspective(900px)_rotateX(var(--rx))_rotateY(var(--ry))] will-change-transform hover:border-accent/40 hover:shadow-[0_24px_60px_-24px_rgba(59,130,246,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
				className
			)}
		>
			<span
				aria-hidden
				className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100'
				style={{
					background:
						'radial-gradient(260px circle at var(--mx) var(--my), rgba(96,165,250,0.16), transparent 70%)'
				}}
			/>
			{children}
		</Tag>
	);
}
