import React from 'react';

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

/* const iterateHTMLCollection = (a: HTMLCollection, fnc: any) => {
  for (let i = 0; i < a.length; i++) fnc(a.item(i));
} */

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

const handleThemeClick = (e: any) => {
  const sc = DOMStringMapToObj(e.target.dataset);
  prevcolor.base = sc.base;
  prevcolor.shade = sc.shade;
  setcolor(sc.base, sc.shade);
  e.target.classList.add("selected");
}

interface DesignPreviewProps {

}

export default function DesignPreview (props: DesignPreviewProps) {
  return (
    <div id="designPreview">
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
          <div className={"themecolor"} key={i} data-base={v.base} data-shade={v.shade} onMouseOver={handleThemeHover} onMouseOut={handleThemeHoverOut} onClick={handleThemeClick} style={{background: `linear-gradient(135deg, hsl(${v.base}, 80%, 65%) 50%, hsl(0, 0%, ${90 - Math.abs(v.shade)}%) 50%)`}}></div>
        )}
      </div>
    </div>
  );

}