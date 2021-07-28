import Container from "../container/Container";
import SelectionArea, { ButtonField, TextField } from "../selectionArea/SelectionArea";
import "./settings.scss";

interface kvsp {
  [index: number]: string
}

const keypoints: kvsp = {
   30: 'orange',
   60: 'yellow',
  120: 'green',
  160: 'mint',
  180: 'turquise',
  210: 'blue',
  240: 'blacklight',
  270: 'purple',
  290: 'pink',
  330: 'rose',
  360: 'red'
}

const setcolor = (hue: number) => document.documentElement.style.setProperty('--c', String(hue));

//             val, nearest, diff
var nearest = [0,   0,       Infinity];

const sliderSnap = (evt: any) => {

  const { valueAsNumber } = evt.target;

  nearest[0] = valueAsNumber;
  setcolor(nearest[0]);
  
  let least = Infinity;
  for(const i of Object.keys(keypoints)) {
    let v = Math.abs(nearest[0] - Number(i));
    if(least > v) {
      nearest[1] = Number(i);
      nearest[2] = v;
      least = v;
    }
  }

  console.log(`Nearest color: ${keypoints[nearest[1]]}`);
  
}

export default function Settings() {

  return (
    <Container id={"settings"}>
      <SelectionArea columns={3}>
        <div>
          <TextField text={"Email"} placeholder={"larsl@gmail.com"} />
          <TextField text={"First name"} placeholder={"lars"} />
          <TextField text={"Last name"} placeholder={"larsen"} />
        </div>
        <div>
          <ButtonField text="Connect">
            <span><img src="google.com/favicon.ico" alt="" />Google</span>
          </ButtonField>
        <ButtonField text="Connect">
            <span><img src="microsoft.com/favicon.ico" alt="" />Microsoft</span>
          </ButtonField>
        <ButtonField text="Connect">
            <span><img src="apple.com/favicon.ico" alt="" />Apple</span>
          </ButtonField>
        </div>
        <div>
          <ButtonField text="Request data" vertical>
            <span>Account data</span>
          </ButtonField>
          <ButtonField text="Delete my account" vertical danger>
            <span>Danger zone</span>
          </ButtonField>
        </div>
      </SelectionArea>
      <SelectionArea columns={3}>
        <input id={"colorHueSelect"} type="range" min={0} max={360} step={1} onInput={sliderSnap} defaultValue={230}></input>
      </SelectionArea>
    </Container>
  );
}