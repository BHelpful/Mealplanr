import Container from '../container/Container';
import Recipes from '../recipes/Recipes';
import SelectionArea, { Search, Tag } from '../selectionArea/SelectionArea';
import "./RecipeView.scss";

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
				<Search decription={"Allergies/intolerances"} type={"list"} taglist>
					<Tag type="" name="Lactose"/>
					<Tag type="" name="Peanut"/>
				</Search>
				<Search decription={"Sort"} type={"dropdown"} taglist={false}>
					<div>Rating</div>
					<div>Newest</div>
					<div>Quickest</div>
					<div>Slowest</div>
				</Search>
			</SelectionArea>
			<div className="recipes">
				<Recipes showAddOwn="true" mealFrom={personal?'personal':'public'}/>
			</div>
		</Container>
	);
}
