import Container from "../container/Container";
import SelectionArea, { Item, Listing, Quantaty, Search, TextField } from "../selectionArea/SelectionArea";
import "./CreateRecipe.scss";

export default function CreateRecipe() {
  return (
    <Container id="createrecipe">
      <h1>Create recipe</h1>
      <div className="button">Create</div>
      <SelectionArea columns={2} cln={"details"}>
        <div>
          <TextField decription={"Title of recipe"} placeholder={"Pyttipanna"} />
          <TextField large decription={"Short decription of the recie"} placeholder={"This recipe is great."} />
          <Search decription={"Type of meal"} type={"select"}/>
          <div className={"quantities"}>
            <Quantaty time />
            <Quantaty />
          </div>
        </div>
        <div>
          <Listing drag name={"Prerequisites"}>
            <Item drag name={"Turn on the oven"}></Item>
            <Item drag name={"Clean the beans"}></Item>
          </Listing>
        </div>
        <div>
          <div>
            <div className={"image"}></div>
          </div>
          <div className={"button"}>Add image</div>
        </div>
      </SelectionArea>
      <SelectionArea columns={2} cln={"guide"}>
        <div>
          <p>Ingredients</p>
          <Quantaty />
          <Listing drag={false} name={"Main course"}>
            <Item name={"Carrot"} />
            <Item name={"Carrot"} />
          </Listing>
          <Listing drag={false} name={"Dessert"}>
            <Item name={"Carrot"} />
            <Item name={"Carrot"} />
          </Listing>
        </div>
        <div>
          <Listing drag name={"Title of recipe"}>
            <Item drag name={"Mix all ingridents in a bowl"}></Item>
            <Item drag name={"Stir the mix"}></Item>
            <Item drag name={"Cool in frigde for half an hour"}></Item>
            <Item drag name={"Put the mix in a tray"}></Item>
            <Item drag name={"Bake in oven for 20 minuts"}></Item>
          </Listing>
        </div>
      </SelectionArea>
    </Container>
  );
}