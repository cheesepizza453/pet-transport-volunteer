import React from 'react';
import ComponentLayoutHeader from "../src/component/layout/header/component.layout.header";
import ComponentMain from "../src/component/main/component.main";

export default function Home() {
  return (
    <>
      <div className={'bg-gray-950 h-[100dvh] overflow-hidden'}>
        <div className={'relative max-w-[500px] mx-auto h-full bg-white'}>
          <ComponentLayoutHeader/>
          <ComponentMain/>
          {/*<ComponentLayoutFooter/>*/}
        </div>
      </div>
    </>
  );
}