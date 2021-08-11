import Container from "../container/Container";
import SelectionArea, { Guide, Item, Listing, Quantaty, Step, Tag } from "../selectionArea/SelectionArea";
import "./Showcase.scss";

export default function Showcase () {
  return (
    <Container id="showcase">
      <h1>Recipe showcase</h1>
      <div className="button">Edit</div>
      <SelectionArea columns={2} cln={"trailer"}>
        <div>
          <h2>{"{{"}Title{"}}"}</h2>
          <div>
            <span>{"{{"}Time{"}}"}</span>
            <div className={"list"}>
              <Tag type={"none"} name={"Main course"}/>
              <Tag type={"none"} name={"{{Tag}}"}/>
            </div>
            </div>
          <p>{"{{"}Decription{"}}"} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda odio blanditiis, fugit recusandae itaque quis aut iusto eos id optio eligendi quas ad, magni dolorem dolore numquam? Animi, dolore in?</p>
          <div>{"{{"}Rating{"}}"}</div>
        </div>
        <div>
          <div className={"image"}></div>
        </div>
      </SelectionArea>
      <SelectionArea columns={2} cln={"guide"}>
        <div>
          <h3>Ingredients</h3>
          <Quantaty />
          <Listing drag={false} name={"Main course"}>
            <Item name={"Carrot"} amount={5} unit={"pcs"}/>
            <Item name={"{{Item}}"}  amount={5} unit={"pcs"}/>
          </Listing>
          <Listing drag={false} name={"{{Dish}}"}>
            <Item name={"{{Item}}"} amount={5} unit={"pcs"}/>
            <Item name={"{{Item}}"} amount={5} unit={"pcs"}/>
          </Listing>
        </div>
        <div>
          <Guide title={"Instructions"}>
            <Step decs={"Do one thing"} />
            <Step decs={"Chop something - not your fingers!"} />
            <Step decs={"Do one thing once again"} />
            <Step decs={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."} />
            <Step decs={"{{Instruction}}"} />
          </Guide>
        </div>
      </SelectionArea>
    </Container>
  );
}