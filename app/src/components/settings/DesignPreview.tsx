import React from 'react';

const themes = [
  { base: 200, shade: [0,0,90] },
  { base: 0,   shade: [0,0,90] },
];

export default function DesignPreview () {

  return (
    <div id="designPreview">
      <div className={"dpwshade"}>
        <div className={"dpwbackground"}>
          <div className={"dpwselectionarea"}>
            <div className={"dpwarea"}></div>
            <div className={"dpwfield"}></div>
            <div className={"dpwbutton"}></div>
          </div>
        </div>
      </div>
      {themes.map(()=>{
        return <></>
      })}
    </div>
  );

}