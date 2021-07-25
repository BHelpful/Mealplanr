import './Recipes.scss';

const mealPlan = [
	{
		recepieId: -1,
		time: '',
	},
	{
		recepieId: 252816,
		time: '18:00',
	},
	{
		recepieId: 3500346,
		time: '16:45',
	},
	{
		recepieId: -1,
		time: '',
	},
	{
		recepieId: -1,
		time: '',
	},
	{
		recepieId: -1,
		time: '',
	},
	{
		recepieId: -1,
		time: '',
	},
];

const recipes = [
	{ recepieId: 2102013, },
	{ recepieId: 2340076, },
	{ recepieId: 2500023,	},
	{ recepieId: 3500346, }
];

const myRecipes = [
	{ recepieId: 3500346, }
]

const recepieInfo = (id: number) => {
	switch (id) {
		case 252816: return {
			Title: 'Pyttipanna',
			Decs: 'Pytt i panna, also pytt i panne, pytt i panne, pyttipannu, is a culinary dish consisting of chopped meat, potatoes, and onions fried, similar to a hash',
			Images: 0,
			Time: { value: 15, unit: 'min' },
			Ratings: 233,
			Rating: 700,
			category: 'meat',
		};
		case 3500346: return {
			Title: 'Tomatobeef',
			Decs: 'Greek originated totato-based beef.',
			Images: 2,
			Time: { value: 2, unit: 'hr' },
			Ratings: 1,
			Rating: 5,
			category: 'vegan',
		};
		case 2340076: return {
			Title: 'Appel pie',
			Decs: 'This is a sweet, tart and delicious apple pie. Guaranteed to please. Be sure to use Granny Smith apples since they work the best.',
			Images: 0,
			Time: { value: 1, unit: 'hr' },
			Ratings: 997,
			Rating: 3267,
			category: 'dessert',
		}
		case 2500023: return {
			Title: 'Watermelon salad',
			Decs: 'Salad form the troppes.',
			Images: 0,
			Time: { value: 10, unit: 'min' },
			Ratings: 769,
			Rating: 900,
			category: 'salad',
		}
		default: return {
			Title: 'Placeholder',
			Decs: 'Decsripe the recipe',
			Images: 0,
			Time: {value: -1, unit: 'min'},
			Rating: 0,
			Ratings: 0,
			category: 'meat',
		};
	}
};

function handleAltImg(e: any) {
	e.target.src='/alt.png';
	e.target.parentNode.classList.remove("shadow");
}

function handleNextImage(e: any) {
	if(!e.target.parentElement.classList.contains("shadow")) return;
	const max = e.target.dataset.images;
	const [id, current] = e.target.src.replace(/http:\/\/localhost:3000\/temp\/recepie_(\d+)_(\d+).jpg/,"$1,$2").split(",")
	const next = (Number(current) + 1) % max;
	setTimeout(() => {
		e.target.src = "/temp/recepie_"+id+"_"+next+".jpg"
	},5000)
};

interface RecipeProps {
	type: 'wide'|'tall',
	Id: number,
	At?: string,
	personal: boolean,
}

export function Recipe(props: RecipeProps) {
	const {type, Id, At, personal} = {At: null, ...props};
	const {Images, Title, Decs, Time, Rating, Ratings, category} = recepieInfo(Id);

	return (
		<div className={type + ' recepie ' + (Id !== -1 ? category : 'empty')} onClick={() => console.log('Clicked recepie')}>
			{ Id !== -1 ? <>
				<div className="rimage shadow">
					{	personal ? <span className={"options"}></span> : <></> }
					<img src={"/temp/recepie_"+Id+"_1.jpg"} data-images={Images} onError={handleAltImg} alt="" onLoad={handleNextImage}></img>
				</div>
				<h3>{Title}</h3>
				<p>{Decs}</p>
				{ type === 'tall' ? <>
					<div className="time">
						<span>{At??'00:00'}</span>
					</div>
				</> : <>
					<div className="timebox">
						<div className="time icon"></div>
						<span>{Time.value + ' ' + Time.unit}.</span>
					</div>
					<div className="ratingbox">{Ratings} votes</div>
					<div>
						<span className="rating icon" style={{width: (Rating/Ratings/5*100)+"%"}}></span>
					</div>
				</> }
			</> : <>
				<h3>Add recepie</h3>
				<p>+</p>
			</> }
		</div>
	);
}

interface RecipesProps {
	showAddOwn?: 'true' | 'false';
	mealFrom: 'personal'|'plan'|'public';
}

export default function Recipes(props: RecipesProps) {
	const showAddOwn = props.showAddOwn === 'true' || false;
	const {mealFrom} = props;
	const data = mealFrom === 'personal' ? myRecipes :
								mealFrom === 'plan' ? mealPlan :
									recipes;

	if(mealFrom === 'plan')
		return (
			<>
				{data.map((data: any) => (
					<Recipe type='tall' Id={data.recepieId} At={data.time} personal={true} />
				))}
			</>
		);
	
	else
		return (
			<>
				{showAddOwn ? (
					<div className="empty">
						<h3>Add your own</h3>
						<p>+</p>
					</div>
				) : ''}
				{data.map((data: any) => (
					<Recipe type='wide' Id={data.recepieId} personal={mealFrom==='personal'} />
				))}
			</>
		);
	
}
