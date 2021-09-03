import React from 'react';

interface themetype {
  base: number;
  shade: number;
}

const themes: themetype[] = [
  { base: 200, shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
  { base: 0,   shade: 90 },
];

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
              <div className={"dpwfield"}></div>
              <div className={"dpwbutton"}>Button text</div>
            </div>
          </div>
        </div>
        {themes.map((v: themetype, i: number) => <div className={"themecolor"} key={i} data-base={v.base} data-shade={v.shade}></div>)}
      </div>
    </div>
  );

}