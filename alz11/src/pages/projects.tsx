import { IoPersonCircle } from 'react-icons/io5';
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
	SiSelenium
} from 'react-icons/si';
import { FaReact, FaPython, FaJava } from 'react-icons/fa';
import { ImStatsDots } from 'react-icons/im';

const ICONSIZE = 40;

const PROJECTS = [
	{
		name: 'Personal Website',
		description:
			'A sleek, fully-responsive portfolio site built with React, Tailwind CSS and Typescript that showcases my projects, resume, and blog in a clean, single page layout. I plan on migrating to Next.js in the near future for SEO and server-side rendering.',
		imageSrc: <IoPersonCircle size={ICONSIZE} />,
		imageAlt: 'Personal Website image',
		href: 'https://github.com/AlZ11/website',
		tools: [<FaReact />, <SiTailwindcss />, <SiTypescript />, <SiCss3 />]
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
		name: 'PL Webscraper',
		description:
			'A lightweight Python toolset built with Selenium, utilised Beautiful Soup and pandas to crawl official Premier League website, to deliver clean data frames ready for analysis or ML pipelines. Deprecated due to new PL website layout change following the 25/26 season',
		imageSrc: <GiSoccerBall size={ICONSIZE} />,
		imageAlt: 'https://github.com/AlZ11/PL-Webscraper',
		href: '#',
		tools: [<SiPandas />, <SiSelenium />, <FaPython />, <SiJupyter />]
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
	}
];

export default function Projects() {
	return (
		<div className='text-white font-mono max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto'>
			<div className='max-w-lg py-16 sm:py-24 px-5 lg:max-w-none lg:py-32 mx-auto'>
				<h2 className='text-2xl font-bold font-mono'>My projects</h2>

				<div className='mt-8 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-20 lg:gap-x-15'>
					{PROJECTS.map((project) => (
						<div key={project.name} className='group relative'>
							<div className='flex flex-col items-start gap-y-2 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-neutral-900 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 text-left hover:scale-110 transition duration-300 ease-in-out'>
								<i>{project.imageSrc}</i>
								<p className='mt-3 text-2xl font-semibold'>{project.name}</p>
								<h3 className='mt-2 text-gray-500 text-sm'>
									<a href={project.href}>
										<span className='absolute inset-0' />
										{project.description}
									</a>
								</h3>
								<i className='flex flex-row gap-5 pt-3'>{project.tools}</i>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
