import { useState, createContext, useContext } from 'react';

const today = new Date();
const person = {
	name: 'Alex W. Zhang',
	theme: {
		backgroundColor: 'black',
		color: 'pink'
	}
};

const people = [
	'Creola Katherine Johnson: mathematician',
	'Mario José Molina-Pasquel Henríquez: chemist',
	'Mohammad Abdus Salam: physicist',
	'Percy Lavon Julian: chemist',
	'Subrahmanyan Chandrasekhar: astrophysicist'
];

const itemPortal = createContext(people);

function Item1() {
	const var1 = useContext(itemPortal);
	return 1;
}

function Item2() {
	const var2 = useContext(itemPortal);
	return var2[0];
}

const listItems = function (list: any) {
	return list.map((person: any) => <li>{person}</li>);
};

const chemist = people.filter((person) => person.includes('chemist'));

function formatDate(date: number | Date | undefined) {
	return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
}
export function Component1() {
	return <img src='https://i.imgur.com/MK3eW3Am.jpg' alt='Katherine' />;
}

export function TodoList({ person, size }: { person: any; size: number }) {
	return (
		<>
			<h1>
				{person.name}'s Todos for {formatDate(today)}{' '}
			</h1>
			<img src='https://i.imgur.com/yXOvdOSs.jpg' alt='Random' className='photo' width={size} height={size} />
			<ul style={person.theme}>
				<li>Invest stuff</li>
				<li>Movie</li>
				<li>Improve stuff</li>
			</ul>
		</>
	);
}

export function Avatar({ person, size }: { person: any; size: number }) {
	const pic = 'https://i.imgur.com/7vQD0fPs.jpg';
	const descripton = 'Gregorio Y. Zara';
	return (
		<>
			<div style={person.theme}>
				<h1>Description of a person: {person.descripton} </h1>
				<img src={pic} alt={descripton} width={size} />
			</div>
		</>
	);
}

function Picture({ image }: { image: any }) {
	return (
		<>
			<h1>image tag</h1>
			<img src={image} />
		</>
	);
}

function Packing({ item, isPacked }: { item: string; isPacked: boolean }) {
	return <>{isPacked ? item + ' ✅' : item}</>;
}

function List() {
	return <ul>{listItems(people)}</ul>;
}

function Button({ message }: { message: string }) {
	function handleClick() {
		alert(message + '!');
	}
	return <button onClick={handleClick}>Press me!</button>;
}

function Upload() {
	return <button onClick={() => alert('Uploading...')}>Upload stuff</button>;
}

function Toolbar() {
	return (
		<div style={{ backgroundColor: 'yellow' }} onClick={() => alert('Clicked second time')}>
			Section
			<button onClick={() => alert('Clicked once')}>Click this button to receive two alerts</button>
		</div>
	);
}
// How rendering works
function Counter1() {
	const [number, setNumber] = useState(0);

	alert('Component rendered');

	function handleClick() {
		setNumber(number + 1); // 🟢 This triggers a re-render
		alert('Button clicked');
	}

	return (
		<div>
			<h1>{number}</h1>
			<button onClick={handleClick}>+1</button>
		</div>
	);
}

function Button1({ onClick, children }: { onClick: any; children: any }) {
	return (
		<button
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
		>
			{children}
		</button>
	);
}

function People() {
	const [index, setIndex] = useState(0);
	const [show, setShow] = useState(false);

	function handleClickIncrease({ list }: { list: any }) {
		if (index < list.length - 1) {
			setIndex(index + 1);
		}
	}

	function handleClickDecrease() {
		if (index > 0) {
			setIndex(index - 1);
		}
	}

	function handleShow() {
		setShow(!show);
	}

	let person = people[index];

	return (
		<>
			<button onClick={handleShow}>{show ? 'Hide' : 'Show'} details</button>
			{show && (
				<div>
					<button onClick={() => handleClickIncrease({ list: people })}>Next person</button>
					<button onClick={handleClickDecrease}>Previous person</button>
				</div>
			)}
			{show && <p>{person}</p>}
		</>
	);
}

function Toolbar1() {
	return (
		<div
			className='Toolbar'
			onClick={() => {
				alert('You clicked on the toolbar!');
			}}
			style={{ backgroundColor: 'red' }}
		>
			<Button1 onClick={() => alert('Playing!')}>Play Movie</Button1>
			<Button1 onClick={() => alert('Uploading!')}>Upload Image</Button1>
		</div>
	);
}

function Object() {
	const [something, setSomething] = useState({ x: 0, y: 0 });
	return (
		<>
			<Button1 onClick={() => setSomething({ x: something.x + 1, y: something.y + 1 })}>Change something</Button1>
			<ul>
				<li>{something.x};</li>
				<li>{something.y};</li>
			</ul>
		</>
	);
}

export default function Component2() {
	return (
		<section>
			<h1>Amazing people</h1>
			<Avatar person={person} size={100} />
			<Picture image={'https://i.imgur.com/7vQD0fPs.jpg'} />
			<Packing item={'Umbrella'} isPacked={true} />
			<List />
			<Button message={'Testing'} />
			<Upload />
			<Toolbar />
			<Toolbar1 />
			<br></br>
			<ul>{listItems(chemist)}</ul>
			<br></br>
			<People />
			<Counter1 />
			<Object />
			<itemPortal.Provider value={people}>
				<Item1 />
				<Item2 />
			</itemPortal.Provider>
		</section>
	);
}
