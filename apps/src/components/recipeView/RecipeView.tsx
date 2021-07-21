import Container from '../container/Container';
import Recepies from '../recipes/Recipes';

export default function RecipeView() {
	return (
		<Container id="browse">
			<h1>Browse recepies</h1>
			<div className="searchmenu"></div>
			<div className="recepies">
				<Recepies showAddOwn="true" />
			</div>
		</Container>
	);
}
