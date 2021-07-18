import Container from "./Container"
import "./Mealplan.scss"

const mealplan = [

  {
    recepieId: -1,
    type: '',
    time: ""
  },
  {
    recepieId: 252816,
    type: 'meat',
    time: "18:00"
  },
  {
    recepieId: -1,
    type: '',
    time: ""
  },
  {
    recepieId: -1,
    type: '',
    time: ""
  },
  {
    recepieId: -1,
    type: '',
    time: ""
  },
  {
    recepieId: -1,
    type: '',
    time: ""
  },
  {
    recepieId: -1,
    type: '',
    time: ""
  },

];

const recepieInfo = ((id: number) => {
  switch(id) {
  
    case 252816: return {
      Title: "Pyttipanna",
      Desc: "Pytt i panna, also pytt i panne, pytt i panne, pyttipannu, is a culinary dish consisting of chopped meat, potatoes, and onions fried, similar to a hash",
      Img: "",
    }

    default: return {

      Title: "",
      Desc: "1",
      Img: "",

    }

  }
});

interface PlanProps {
  recepie: number,
  time: string,
}

function Plan(props: PlanProps) {
    const {Title, Desc, Img} = recepieInfo(props.recepie);
    if(props.recepie!==-1) {
      return (
        <>
          <div className="image">{Img}</div>
          <h3>{Title}</h3>
          <p>{Desc}</p>
          <div className="time"><span>{props.time}</span></div>
        </>
      );
    } else {
      return (
        <>
          <h3>Add recepie</h3>
          <p>+</p>
        </>
      );
  }
}

export default function Mealplan() {

  return (
    <Container id="mealplan">

      <h1>My meal plan</h1>
      <div className="button">Create Plan</div>
      <div className="plans">
        {mealplan.map(((data: any, index: number) => (
          <div key={index.toString()} className={"tall recepie "+(data.recepieId!==-1?data.type:"empty")} onClick={() => console.log("Clicked recepie in mealplan")}>
            <Plan recepie={data.recepieId} time={data.time}/>
          </div>
        )))}
      </div>

    </Container>
  )
};