import './Recipes.scss';

const recepies = [
	{
		Type: 'meat',
		Title: 'Pyttipanna',
		Desc: 'Pytt i panna, also pytt i panne, pytt i panne, pyttipannu, is a culinary dish consisting of chopped meat, potatoes, and onions fried, similar to a hash',
		Id: 2102013,
		Images: 0,
		Time: { value: 15, unit: 'min' },
		Ratings: 233,
		Rating: 700,
	},
	{
		Type: 'dessert',
		Title: 'Appel pie',
		Desc: 'This is a sweet, tart and delicious apple pie. Guaranteed to please. Be sure to use Granny Smith apples since they work the best.',
		Id: 2340076,
		Images: 0,
		Time: { value: 1, unit: 'hr' },
		Ratings: 997,
		Rating: 3267,
	},
	{
		Type: 'salad',
		Title: 'Watermelon salad',
		Desc: 'Salad form the troppes.',
		Id: 2500023,
		Images: 0,
		Time: { value: 10, unit: 'min' },
		Ratings: 769,
		Rating: 900,
	},
	{
		Type: 'vegan',
		Title: 'Tomatobeef',
		Desc: 'Greek originated totato-based beef.',
		Id: 3500346,
		Images: 2,
		Time: { value: 2, unit: 'hr' },
		Ratings: 1,
		Rating: 5,
	}
];

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

interface RecepiesProps {
	showAddOwn?: 'true' | 'false';
}

export default function Recepies(props: RecepiesProps) {
	const showAddOwn = props.showAddOwn === 'true' || false;
	return (
		<>
			{showAddOwn ? (
				<div className="empty">
					<h3>Add your own</h3>
					<p>+</p>
				</div>
			) : (
				''
			)}
			{recepies.map((data: any, index: number) => (
				<div
					key={index.toString()}
					className={'wide recepie ' + data.Type}
					onClick={() => console.log('Clicked recepie in browse')}
				>
					<div className="rimage shadow">
						<img src={"/temp/recepie_"+data.Id+"_1.jpg"} data-images={data.Images} onError={handleAltImg} alt="" onLoad={handleNextImage}></img>
					</div>
					<h3>{data.Title}</h3>
					<p>{data.Desc}</p>
					<div className="timebox">
						<div className="time icon"></div>
						<span>{data.Time.value + ' ' + data.Time.unit}.</span>
					</div>
					<div className="ratingbox">{data.Ratings} votes</div>
					<div>
						<span
							className="rating icon"
							style={{width: (data.Rating/data.Ratings/5*100)+"%"}}></span>
					</div>
				</div>
			))}
		</>
	);
}
