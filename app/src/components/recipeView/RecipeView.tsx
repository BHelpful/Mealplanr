import Container from '../container/Container';
import Recipes from '../recipes/Recipes';
import SelectionArea, { Search } from '../selectionArea/SelectionArea';
import "./RecipeView.scss";

const sortDatalist = [
	'Rating','Newest','Quickest','Slowest'
]

interface RecipeViewProps {
	personal?: boolean,
}

export default function RecipeView(props: RecipeViewProps) {
	const {personal} = {personal: false, ...props};
	return (
		<Container id={!personal ? "browse" : "collection"}>
			<h1>{ !personal ? 'Browse recipes' : 'My collection' } </h1>
			<SelectionArea columns={1}>
				<Search decription={"Search"} type={"normal"}/>
				<Search decription={"Allergies/intolerances"} type={"list"} taglist />
				<Search decription={"Sort"} type={"dropdown"} taglist={false} datalist={sortDatalist} />
			</SelectionArea>
			<div className="recipes">
				<Recipes showAddOwn="true" mealFrom={personal?'personal':'public'}/>
			</div>
		</Container>
	);
}
