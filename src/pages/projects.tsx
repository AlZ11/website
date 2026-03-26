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
import Card from '../../components/Card';
import { MdCandlestickChart, MdSpaceDashboard } from "react-icons/md";


const ICONSIZE = 40;

const PROJECTS = [
	{
		name: 'Personal Website',
		description:
			'A sleek, fully responsive portfolio site built with React, Tailwind CSS and Typescript that showcases a little bit about me, projects, and resume. I plan on adding random new sections to this website in the future.',
		imageSrc: <IoPersonCircle size={ICONSIZE} />,
		imageAlt: 'Personal Website image',
		href: 'https://github.com/AlZ11/website',
		tools: [<FaReact />, <SiTailwindcss />, <SiTypescript />, <SiHtml5 />, <SiCss3 />]
	},
	{
		name: 'NASDAQ Feed Handler',
		description:
			'A C++ engine that parses the NASDAQ TotalView-ITCH 5.0 at 11.5 million msg/s. It bypasses standard memory copying by mapping files directly, and replaces slow tree structures with flat arrays to exploit L1 cache locality. The system is optimized entirely for maximum single core throughput and minimal I/O latency.',
		imageSrc: <MdCandlestickChart size={ICONSIZE} />,
		imageAlt: 'Candle Stick image',
		href: 'https://github.com/AlZ11/NASDAQ-Feed-Handler',
		tools: [<SiCplusplus />]
	},
	{
		name: 'ETF Analysis',
		description:
			'Python notebooks that turn raw S&P 500 price data into investment insight. Cleaned and performed feature-engineering the series before running MA trend signals, ARIMA forecasts, and Markowitz portfolio optimisation to reveal risk adjusted allocations at a glance.',
		imageSrc: <AiOutlineStock size={ICONSIZE} />,
		imageAlt: 'ETF Analysis image',
		href: 'https://github.com/AlZ11/ETF-Analysis',
		tools: [<SiPandas />, <SiSelenium />, <FaPython />, <ImStatsDots />, <SiPlotly />, <SiJupyter />]
	},
	{
		name: 'J1 League Dashboard',
		description:
			"Data driven dashboard analyzing J1 League's title volatility, promotion survival rates, and player performance. Built using Tableau Public with official J League data, transforming raw football statistics into actionable sports business intelligence.",
		imageSrc: <MdSpaceDashboard size={ICONSIZE} />,
		imageAlt: 'Dashboard image',
		href: 'https://public.tableau.com/app/profile/alex.zhang3765/viz/JLeague/Dashboard1',
		tools: [<IoLogoTableau />, <FaPython />, <SiPandas />, <SiSelenium />]
	},
	{
		name: 'GeoDemo Visualisations',
		description:
			'A set of interactive Bokeh + GeoPandas visualisation exploring world demographic history: consisting of a choropleth map, a slider driven scatter plot and a dynamic pie chart—together revealing how population trends and mortality causes have shifted across the globe.',
		imageSrc: <IoMdGlobe size={ICONSIZE} />,
		imageAlt: 'GeoDemo-Visualisations image',
		href: 'https://github.com/AlZ11/GeoDemo-Visualisations',
		tools: [<SiPandas />, <SiPlotly />, <FaPython />, <SiGeopandas />, <SiJavascript />, <SiJupyter />]
	},
	{
		name: 'Ray Tracer',
		description:
			'A compact C++ ray tracer, incrementally adding spheres, materials, depth of field camera, soft shadows and Monte-Carlo global illumination until it renders photorealistic scenes—all in fewer than 2k lines of self contained code and ready for further expansion into BVH acceleration, textures and volumetric effects',
		imageSrc: <SiRaycast size={ICONSIZE} />,
		imageAlt: 'Ray Tracer image',
		href: 'https://github.com/AlZ11/Ray-Tracer',
		tools: [<SiCplusplus />]
	},
	{
		name: 'PL Webscraper',
		description:
			'A lightweight Python toolset built with Selenium, utilised Beautiful Soup and pandas to crawl official Premier League website, to deliver clean data frames ready for analysis or ML pipelines. Deprecated due to new PL website layout change following the 25/26 season',
		imageSrc: <GiSoccerBall size={ICONSIZE} />,
		imageAlt: 'PL Webscraper image',
		href: 'https://github.com/AlZ11/PL-Webscraper',
		tools: [<SiPandas />, <SiSelenium />, <FaPython />, <SiJupyter />]
	}
];

export default function Projects() {
	return (
		<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white font-mono'>
			<div className='mx-auto max-w-max py-16 sm:py-24 lg:py-32'>
				<h2 className='text-2xl font-bold font-mono'>My projects</h2>

				<div className='mt-8 space-y-12 grid md:grid-cols-2 lg:grid-cols-3 lg:space-y-8 lg:gap-x-8'>
					{PROJECTS.map((project) => (
						<div key={project.name} className='group relative'>
							<a href={project.href}>
								<Card className='items-start rounded-xl p-6 text-left'>
									<i>{project.imageSrc}</i>
									<p className='mt-3 text-xl font-semibold'>{project.name}</p>
									<h3 className='mt-6 text-gray-500 text-sm'>
										<span className='absolute inset-0' />
										{project.description}
									</h3>
									<i className='flex flex-row gap-5 pt-3'>{project.tools}</i>
								</Card>
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
