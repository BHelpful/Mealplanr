import Container from '../container/Container';
import './Mealplan.scss';
import '../recipes/Recipes.scss';
import SelectionArea, {
	Search,
	WeekdaysButtons,
	WeekdaysDropdown,
} from '../selectionArea/SelectionArea';
import Recipes from '../recipes/Recipes';

const foodSuggestions = [
	'Carrot', 'Chicken', 'Milk', 'Gauda', 'Salmon', 'Egg', 'Pineapple', 'Bacon'
]

const storesSuggestions = [
	'Rema1000', 'Fakta', 'Bilka', 'Meny', 'Netto', 'SuperBrugsen', 'Liva'
]

const categorySuggestions = [
	'Spice', 'Asian', 'Indian', 'American', 'Traditional', 'Nordic'
]

export default function Mealplan() {
	return (
		<Container id="mealplan">
			<h1>My meal plan</h1>
			<div className="button">Cancel</div>
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
				</div>
				<div>
					{/* <Tag type="salad" name="Gouda" />
						<Tag type="meat" name="Chicken" />
						<Tag type="diray" name="Milk" />
						<Tag type="vegan" name="Carrots" />
						<Tag type="exotic" name="Saffron " />
					<Tag type="fish" name="Salmon" /> */}
					<Search taglist
						type='search'
						decription={'What foods do you have at home already'}
						datalist={foodSuggestions} />
					<Search taglist
						type='search'
						decription={'What stores do you prefer?'}
						datalist={storesSuggestions} />
					<Search taglist
						type='search'
						decription={'What categories do you wish to have recipes from?'}
						datalist={categorySuggestions} />
				</div>
				<div>
					<div className={"big button"}>Create mealplan</div>
				</div>
			</SelectionArea>
			<div className="plans">
				<div className="scrollFiller"></div>
					<Recipes mealFrom='plan'/>
				<div className="scrollFiller"></div>
			</div>
		</Container>
	);
}
