import React from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../reducers/theme';

interface themetype {
  base: number;
  shade: number;
}

const themes: themetype[] = [
  { base:  20, shade: 0 },
  { base:  30, shade: 0 },
  { base: 120, shade: 0 },
  { base: 160, shade: 0 },
  { base: 180, shade: 0 },
  { base: 210, shade: 0 },
  { base: 240, shade: 0 },
  { base: 270, shade: 0 },
  { base: 330, shade: 0 },
  { base: 340, shade: 0 },
  { base: 360, shade: 0 },
];


const prevcolor = {
  base: Number(document.documentElement.style.getPropertyValue('--c')),
  shade: Number(document.documentElement.style.getPropertyValue('--e').replace(/%/, ""))
};
const setcolor = (base: number, shade: number) => {
  document.documentElement.style.setProperty('--c', base.toString());
  document.documentElement.style.setProperty('--e', shade+"%");
};

const DOMStringMapToObj = (dsm: DOMStringMap) => {
  const obj: any = {};
  Object.keys(dsm).forEach((k: string) => obj[k] = dsm[k]);
  return obj;
}

const handleThemeHover = (e: any) => {
  const sc = DOMStringMapToObj(e.target.dataset);
  setcolor(sc.base, sc.shade);
}

const handleThemeHoverOut = (e: any) => {
  setcolor(prevcolor.base, prevcolor.shade);
}

const handleThemeClick = (dispatch: any) => (e: any) => {
  const sc = DOMStringMapToObj(e.target.dataset);
  prevcolor.base = sc.base;
  prevcolor.shade = sc.shade;
  setcolor(sc.base, sc.shade);
  const allPallets = document.getElementsByClassName("themecolor");
  for(let i = 0; i < allPallets.length; i++) allPallets[i].classList.remove("selected");

  const password = "123456";

  e.target.classList.add("selected");
  dispatch(setTheme(password, sc.base, sc.shade));
}

export default function ThemePreview () {
  const dispatch = useDispatch();
  return (
    <div id="ThemePreview">
      <div>
        <div className={"dpwshade"}>
          <div className={"dpwbackground"}>
            <div className={"dpwselectionarea"}>
              <div className={"dpwarea"}>Some explanitory example text</div>
              <input className={"dpwfield"} placeholder="Input"></input>
              <div className={"dpwbutton"}>Button text</div>
            </div>
          </div>
        </div>
        {themes.map((v: themetype, i: number) =>
          <div className={"themecolor"} key={i} data-base={v.base} data-shade={v.shade}
          onMouseOver={handleThemeHover}
          onMouseOut={handleThemeHoverOut}
          onClick={handleThemeClick(dispatch)}
          style={{background: `linear-gradient(135deg, hsl(${v.base}, 80%, 65%) 50%, hsl(0, 0%, ${90 - Math.abs(v.shade)}%) 50%)`}}
          ></div>
        )}
      </div>
    </div>
  );

}