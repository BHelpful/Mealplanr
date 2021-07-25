import Container from '../container/Container';
import Recepies from '../recipes/Recipes';

interface RecipeViewProps {
	personal?: boolean,
}

export default function RecipeView(props: RecipeViewProps) {
	const {personal} = {personal: false, ...props};
	return (
		<Container id={personal ? "browse" : "collection"}>
			<h1>{ personal ? 'Browse recipes' : 'My collection' } </h1>
			<div className="searchmenu"></div>
			<div className="recepies">
				<Recepies showAddOwn="true" mealFrom={personal?'personal':'public'}/>
			</div>
		</Container>
	);
}
