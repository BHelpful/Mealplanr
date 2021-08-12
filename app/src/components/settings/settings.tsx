import Container from "../container/Container";
import SelectionArea, { ButtonField, MultipleChoice, Search, Tag, TextField } from "../selectionArea/SelectionArea";
import "./Settings.scss";

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
      <h1>Personal information</h1>
      <div className={"button"}>Back</div>
      <SelectionArea columns={3}>
        <div>
          <TextField decription={"Email"} placeholder={"larsl@gmail.com"} />
          <TextField decription={"First name"} placeholder={"lars"} />
          <TextField decription={"Last name"} placeholder={"larsen"} />
        </div>
        <div>
          <ButtonField decription="Connect">
            <span><img src="https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_29.ico" alt="" />Google</span>
          </ButtonField>
        <ButtonField decription="Connect">
            <span><img src="https://www.outlook.com/favicon.ico" alt="" />Outlook</span>
          </ButtonField>
        <ButtonField decription="Connect">
            <span><img src="https://www.icloud.com/favicon.ico" alt="" />iCloud</span>
          </ButtonField>
        </div>
        <div>
          <div>
            <div className={"image"}></div>
          </div>
          <div className={"button"}>Change profile picture</div>
        </div>
        <div className={"infrequent"}>
          <ButtonField decription="Request data" vertical>
            <span>Account data</span>
          </ButtonField>
          <ButtonField decription="Change password" vertical danger>
            <span>Access</span>
          </ButtonField>
          <ButtonField decription="Delete my account" vertical danger>
            <span>Danger zone</span>
          </ButtonField>
        </div>
      </SelectionArea>
      <h1>Preferences</h1>
      <SelectionArea columns={3}>
        <div>
          <Search decription="Contry" type="" />
          <Search taglist decription="What stores do you prefer?">
            <Tag type="none" name="Netto" />
          </Search>
        </div>
        <div>
          <Search decription="Diet" type="dropdown" />
          <Search taglist decription="Allergies / intolerences">
            <Tag type="exotic" name="Hazelnut" />
            <Tag type="dariy" name="Lactose" />
          </Search>
          <MultipleChoice decription="Hide recipes containing these"  name="itolalgi"/>
        </div>
        <div>
          <p>Notifications</p>
          <MultipleChoice decription="Email" name="email"/>
          <MultipleChoice decription="Web" name="web"/>
          <MultipleChoice decription="Mobile" name="mobile"/>
          <p>Theme</p>
          <input id={"colorHueSelect"} type="range" min={0} max={360} step={1} onInput={sliderSnap} defaultValue={230}></input>
        </div>
      </SelectionArea>
    </Container>
  );
}