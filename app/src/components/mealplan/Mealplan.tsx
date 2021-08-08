import Container from '../container/Container';
import './Mealplan.scss';
import '../recipes/Recipes.scss';
import SelectionArea, {
	Tag,
	Search,
	WeekdaysButtons,
	WeekdaysDropdown,
} from '../selectionArea/SelectionArea';
import Recipes from '../recipes/Recipes';

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
					<Search taglist
						type='search'
						decription={'What foods do you have at home already'}>
						<Tag type="salad" name="Gouda" />
						<Tag type="meat" name="Chicken" />
						<Tag type="diray" name="Milk" />
						<Tag type="vegan" name="Carrots" />
						<Tag type="exotic" name="Saffron " />
						<Tag type="fish" name="Salmon" />
					</Search>
					<Search taglist
						type='search'
						decription={'What stores do you prefer?'}>
						<Tag type="none" name="Rema1000" />
						<Tag type="none" name="Føtex" />
					</Search>
					<Search taglist
						type='search'
						decription={'What categories do you wish to have recipes from?'}>
						<Tag type="none" name="Spice" />
						<Tag type="none" name="Asian" />
					</Search>
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
