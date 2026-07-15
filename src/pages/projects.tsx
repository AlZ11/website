import { IoPersonCircle, IoLogoTableau } from 'react-icons/io5';
import { IoMdGlobe } from 'react-icons/io';
import { AiOutlineStock } from 'react-icons/ai';
import { GiSoccerBall } from 'react-icons/gi';
import {
	SiRaycast,
	SiTypescript,
	SiTailwindcss,
	SiCss3,
	SiCplusplus,
	SiPandas,
	SiJupyter,
	SiPlotly,
	SiGeopandas,
	SiJavascript,
	SiSelenium,
	SiHtml5
} from 'react-icons/si';
import { FaReact, FaPython } from 'react-icons/fa';
import { ImStatsDots } from 'react-icons/im';
import { HiArrowUpRight } from 'react-icons/hi2';
import Card from '../../components/Card';
import { MdCandlestickChart, MdSpaceDashboard } from 'react-icons/md';

const ICONSIZE = 26;

const PROJECTS = [
	{
		name: 'NASDAQ Feed Handler',
		tag: 'C++ · Low latency',
		description:
			'A C++ engine that parses the NASDAQ TotalView-ITCH 5.0 at 11.5 million msg/s. It bypasses standard memory copying by mapping files directly, and replaces slow tree structures with flat arrays to exploit L1 cache locality. Optimized entirely for maximum single-core throughput and minimal I/O latency.',
		imageSrc: <MdCandlestickChart size={ICONSIZE} />,
		href: 'https://github.com/AlZ11/NASDAQ-Feed-Handler',
		tools: [{ icon: <SiCplusplus />, name: 'C++' }]
	},
	{
		name: 'ETF Analysis',
		tag: 'Python · Quant',
		description:
			'Python notebooks that turn raw S&P 500 price data into investment insight. Cleaned and feature-engineered the series before running MA trend signals, ARIMA forecasts, and Markowitz portfolio optimisation to reveal risk-adjusted allocations at a glance.',
		imageSrc: <AiOutlineStock size={ICONSIZE} />,
		href: 'https://github.com/AlZ11/ETF-Analysis',
		tools: [
			{ icon: <SiPandas />, name: 'pandas' },
			{ icon: <SiSelenium />, name: 'Selenium' },
			{ icon: <FaPython />, name: 'Python' },
			{ icon: <ImStatsDots />, name: 'statsmodels' },
			{ icon: <SiPlotly />, name: 'Plotly' },
			{ icon: <SiJupyter />, name: 'Jupyter' }
		]
	},
	{
		name: 'J1 League Dashboard',
		tag: 'Tableau · Sports BI',
		description:
			"Data-driven dashboard analyzing J1 League's title volatility, promotion survival rates, and player performance. Built with Tableau Public and official J.League data, transforming raw football statistics into actionable sports business intelligence.",
		imageSrc: <MdSpaceDashboard size={ICONSIZE} />,
		href: 'https://public.tableau.com/app/profile/alex.zhang3765/viz/JLeague/Dashboard1',
		tools: [
			{ icon: <IoLogoTableau />, name: 'Tableau' },
			{ icon: <FaPython />, name: 'Python' },
			{ icon: <SiPandas />, name: 'pandas' },
			{ icon: <SiSelenium />, name: 'Selenium' }
		]
	},
	{
		name: 'Ray Tracer',
		tag: 'C++ · Graphics',
		description:
			'A compact C++ ray tracer, incrementally adding spheres, materials, a depth-of-field camera, soft shadows and Monte-Carlo global illumination until it renders photorealistic scenes — all in fewer than 2k lines of self-contained code, ready for BVH acceleration, textures and volumetric effects.',
		imageSrc: <SiRaycast size={ICONSIZE} />,
		href: 'https://github.com/AlZ11/Ray-Tracer',
		tools: [{ icon: <SiCplusplus />, name: 'C++' }]
	},
	{
		name: 'GeoDemo Visualisations',
		tag: 'Python · Dataviz',
		description:
			'A set of interactive Bokeh + GeoPandas visualisations exploring world demographic history: a choropleth map, a slider-driven scatter plot and a dynamic pie chart — together revealing how population trends and mortality causes have shifted across the globe.',
		imageSrc: <IoMdGlobe size={ICONSIZE} />,
		href: 'https://github.com/AlZ11/GeoDemo-Visualisations',
		tools: [
			{ icon: <SiPandas />, name: 'pandas' },
			{ icon: <SiPlotly />, name: 'Bokeh' },
			{ icon: <FaPython />, name: 'Python' },
			{ icon: <SiGeopandas />, name: 'GeoPandas' },
			{ icon: <SiJavascript />, name: 'JavaScript' },
			{ icon: <SiJupyter />, name: 'Jupyter' }
		]
	},
	{
		name: 'Personal Website',
		tag: 'React · TypeScript',
		description:
			'A sleek, fully responsive portfolio built with React, Tailwind CSS and TypeScript that showcases a little about me, my projects and my resume. I plan on adding new sections to this site over time.',
		imageSrc: <IoPersonCircle size={ICONSIZE} />,
		href: 'https://github.com/AlZ11/website',
		tools: [
			{ icon: <FaReact />, name: 'React' },
			{ icon: <SiTailwindcss />, name: 'Tailwind CSS' },
			{ icon: <SiTypescript />, name: 'TypeScript' },
			{ icon: <SiHtml5 />, name: 'HTML5' },
			{ icon: <SiCss3 />, name: 'CSS3' }
		]
	},
	{
		name: 'PL Webscraper',
		tag: 'Python · Scraping',
		description:
			'A lightweight Python toolset built with Selenium, Beautiful Soup and pandas to crawl the official Premier League website and deliver clean data frames ready for analysis or ML pipelines. Deprecated following the 25/26 PL website redesign.',
		imageSrc: <GiSoccerBall size={ICONSIZE} />,
		href: 'https://github.com/AlZ11/PL-Webscraper',
		tools: [
			{ icon: <SiPandas />, name: 'pandas' },
			{ icon: <SiSelenium />, name: 'Selenium' },
			{ icon: <FaPython />, name: 'Python' },
			{ icon: <SiJupyter />, name: 'Jupyter' }
		]
	}
];

export default function Projects() {
	return (
		<div className='mx-auto max-w-6xl px-6 py-16 font-mono lg:py-24'>
			<div className='max-w-2xl'>
				<span className='text-xs font-semibold uppercase tracking-[0.25em] text-accent'>Portfolio</span>
				<h2 className='mt-3 text-3xl font-extrabold text-white sm:text-4xl'>Things I've built</h2>
				<p className='mt-4 text-sm text-zinc-400 sm:text-base'>
					A selection of projects spanning low-latency systems, quantitative analysis and data
					visualisation. Click any card to explore the source.
				</p>
			</div>

			<div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{PROJECTS.map((project) => (
					<Card key={project.name} href={project.href} className='p-6'>
						<div className='flex items-start justify-between'>
							<span className='grid h-12 w-12 place-items-center rounded-xl bg-accent-strong/15 text-accent ring-1 ring-accent/20'>
								{project.imageSrc}
							</span>
							<HiArrowUpRight className='text-lg text-zinc-500 transition-all duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent' />
						</div>

						<p className='mt-5 text-xs font-medium uppercase tracking-wider text-zinc-500'>{project.tag}</p>
						<h3 className='mt-1 text-lg font-semibold text-white transition-colors group-hover/card:text-accent'>
							{project.name}
						</h3>
						<p className='mt-3 text-sm leading-relaxed text-zinc-400'>{project.description}</p>

						<div className='mt-auto flex flex-wrap items-center gap-2 pt-6'>
							{project.tools.map((tool, i) => (
								<span
									key={i}
									title={tool.name}
									aria-label={tool.name}
									className='grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-sm text-zinc-300 transition-colors group-hover/card:text-white'
								>
									{tool.icon}
								</span>
							))}
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
