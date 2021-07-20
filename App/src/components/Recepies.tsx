import Container from "./Container"
import "./Recepies.scss"

const recepies = [
  {
    Type: "meat",
    Title: "Pyttipanna",
    Desc: "Pytt i panna, also pytt i panne, pytt i panne, pyttipannu, is a culinary dish consisting of chopped meat, potatoes, and onions fried, similar to a hash",
    Img: "",
    Time: {value: 15, unit: "min"},
    Ratings: 233,
    Rating: .94,
  },
  {
    Type: "dessert",
    Title: "Appel pie",
    Desc: "This is a sweet, tart and delicious apple pie. Guaranteed to please. Be sure to use Granny Smith apples since they work the best.",
    Img: "",
    Time: {value: 1, unit: "hr"},
    Ratings: 897,
    Rating: .50,
  },
  {
    Type: "salad",
    Title: "Watermelon salad",
    Desc: "Salad form the troppes.",
    Img: "",
    Time: {value: 10, unit: "min"},
    Ratings: 769,
    Rating: .40,
  },
]

interface RecepiesProps {
  showAddOwn?: "true"|"false",
}

export function Recepies(props: RecepiesProps) {
  const showAddOwn = props.showAddOwn==="true" || false;
  return (
    <>
      {showAddOwn ? <div className="empty"><h3>Add your own</h3><p>+</p></div> : '' }
      {recepies.map(((data: any, index: number) => (
        <div key={index.toString()} className={"wide recepie "+data.Type} onClick={() => console.log("Clicked recepie in browse")}>
          <div className="image">{data.Img}</div>
          <h3>{data.Title}</h3>
          <p>{data.Desc}</p>
          <div className="timebox">
            <div className="time icon"></div>
            <span>{data.Time.value + " " + data.Time.unit}.</span>
          </div>
          <div className="ratingbox">
            <span>{data.Ratings} ratings</span>
            <div className="rating icon" data-ratings={data.Rating}></div>
          </div>
        </div>
      )))}
    </>
  )
}

export default function BrowseRecepies() {

  return (
    <Container id="browse">

      <h1>Browse recepies</h1>
      <div className="searchmenu">
        
      </div>
      <div className="recepies">
        <Recepies showAddOwn="true" />
      </div>

    </Container>
  )
};