import Container from "../container/Container";
import SelectionArea, { Guide, Item, Listing, Quantaty, Step, Tag } from "../selectionArea/SelectionArea";
import "./Showcase.scss";

/* GET DATA FROM API */
const recipie = {
  title: "Pyttipanna",
  time: [20, "min"],
  tags: [
    {type: "type", name: "Main course"},
    {type: "type", name: "Leftovers"},
    {type: "cat", name: "Nordic"},
    {type: "cat", name: "Traditional"}
  ],
  decs: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora necessitatibus omnis delectus sequi optio tenetur eligendi non eos. Voluptatibus praesentium maiores nemo repudiandae ipsam provident ex repellendus officiis animi molestias.",
  rating: [3862, 837],
}
/* END OF GET DATA FROM API */

const colorTag = (tag: any) => {
  switch(tag.name) {
    case "Leftovers":   return 'rainbow';
    case "Main course": return 'gold';
    default:            return "none";
  }
}

export default function Showcase () {

  const starstyle = {
    width: (recipie.rating[0]/recipie.rating[1]) * 20 //40 px per star 
  }

  return (
    <Container id="showcase">
      <h1>Recipe showcase</h1>
      <div className="button">Edit</div>
      <SelectionArea columns={2} cln={"trailer"}>
        <div>
          <h2>{recipie.title}</h2>
          <div>
            <span>{recipie.time[0]+' '+recipie.time[1]}</span>
            <div className={"list"}>
              {recipie.tags.map((v: any, i: number) => <Tag key={i} nonremovable type={colorTag(v)} name={v.name}/>)}
            </div>
            </div>
          <p>{recipie.decs} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda odio blanditiis, fugit recusandae itaque quis aut iusto eos id optio eligendi quas ad, magni dolorem dolore numquam? Animi, dolore in?</p>
          <div><div className={"rating icon"}><span style={starstyle}></span><span></span></div><span>based on {recipie.rating[1]} ratings</span></div>
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