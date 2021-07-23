import Container from '../container/Container';
import './Mealplan.scss';
import SelectionArea, {
	Tag,
	TagSearch,
	WeekdaysButtons,
	WeekdaysDropdown,
} from '../selectionArea/SelectionArea';

const mealplan = [
	{
		recepieId: -1,
		type: '',
		time: '',
	},
	{
		recepieId: 252816,
		type: 'meat',
		time: '18:00',
	},
	{
		recepieId: 3500346,
		type: 'vegan',
		time: '16:45',
	},
	{
		recepieId: -1,
		type: '',
		time: '',
	},
	{
		recepieId: -1,
		type: '',
		time: '',
	},
	{
		recepieId: -1,
		type: '',
		time: '',
	},
	{
		recepieId: -1,
		type: '',
		time: '',
	},
];

const recepieInfo = (id: number) => {
	switch (id) {
		case 252816:
			return {
				Title: 'Pyttipanna',
				Desc: 'Pytt i panna, also pytt i panne, pytt i panne, pyttipannu, is a culinary dish consisting of chopped meat, potatoes, and onions fried, similar to a hash',
				Images: 0,
				Id: id,
			};
		
		case 3500346:
			return {
				Title: 'Tomatobeef',
				Desc: 'Greek originated totato-based beef.',
				Images: 2,
				Id: id,
			};

		default:
			return {
				Title: '',
				Desc: '1',
				Images: '',
				Id: id,
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
	},5000);
}

interface PlanProps {
	recepie: number;
	time: string;
}

function Plan(props: PlanProps) {
	const { Title, Desc, Id, Images } = recepieInfo(props.recepie);
	if (props.recepie !== -1) {
		return (
			<>
				<div className="rimage shadow">
					<span className={"options"}></span>
					<img src={"/temp/recepie_"+Id+"_1.jpg"} data-images={Images} onError={handleAltImg} alt="" onLoad={handleNextImage}></img>
				</div>
				<h3>{Title}</h3>
				<p>{Desc}</p>
				<div className="time">
					<span>{props.time}</span>
				</div>
			</>
		);
	} else {
		return (
			<>
				<h3>Add recepie</h3>
				<p>+</p>
			</>
		);
	}
}

export default function Mealplan() {
	return (
		<Container id="mealplan">
			<h1>My meal plan</h1>
			<div className="button">Create Plan</div>
			<SelectionArea columns={2}>
				<div>
					<WeekdaysButtons
						decription={'Select which days to plan meals for'}
						offset={2}
						namelength={2}
						uppercase={true}
						/>
					<WeekdaysDropdown
						decription={'What meals do you want for each day'}
						offset={2}
						namelength={3}
						uppercase={false}
						/>
					<div></div>
				</div>
				<div>
					<TagSearch
						type='search'
						decription={'What foods do you have at home already'}>
						<Tag type="salad" name="Gouda" />
						<Tag type="meat" name="Chicken" />
						<Tag type="dessert" name="Cocca" />
						<Tag type="vegan" name="Carrots" />
						<Tag type="exotic" name="Saffron " />
						<Tag type="fish" name="Salmon" />
					</TagSearch>
					<TagSearch
						type='search'
						decription={'What stores do you prefer?'}>
						<Tag type="none" name="Rema1000" />
						<Tag type="none" name="Føtex" />
					</TagSearch>
					<TagSearch
						type='search'
						decription={'What categories do you wish to have recipes from?'}>
						<Tag type="none" name="Spice" />
						<Tag type="none" name="Asian" />
					</TagSearch>
				</div>
			</SelectionArea>
			<div className="plans">
				<div className="scrollFiller"></div>
				{mealplan.map((data: any, index: number) => (
					<div
					key={index.toString()}
					className={
						'tall recepie ' +
						(data.recepieId !== -1 ? data.type : 'empty')
					}
					onClick={() =>
						console.log('Clicked recepie in mealplan')
					}
					>
						<Plan recepie={data.recepieId} time={data.time} />
					</div>
				))}
				<div className="scrollFiller"></div>
			</div>
		</Container>
	);
}
