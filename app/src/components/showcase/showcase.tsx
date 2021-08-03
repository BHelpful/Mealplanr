import Container from "../container/Container";
import SelectionArea, { Item, Listing, Quantaty, Tag } from "../selectionArea/SelectionArea";
import "./showcase.scss";

export default function Showcase () {
  return (
    <Container className={"showcase"}>
      <h1>Recipe showcase</h1>
      <div>Edit</div>
      <SelectionArea columns={2} cln={"showcase trailer"}>
        <div>
          <h2>Title</h2>
          <div>
            <span>Time</span>
            <div className={"list"}>
              <Tag type={"none"} name={"Main course"}/>
              <Tag type={"none"} name={"Launch"}/>
            </div>
            </div>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda odio blanditiis, fugit recusandae itaque quis aut iusto eos id optio eligendi quas ad, magni dolorem dolore numquam? Animi, dolore in?</p>
          <div>Rating</div>
        </div>
        <div>
          <div className={"image"}></div>
        </div>
      </SelectionArea>
      <SelectionArea columns={2}>
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
      </SelectionArea>
    </Container>
  );
}