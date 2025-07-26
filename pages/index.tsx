import React from 'react';
import ComponentLayoutFooter from "../src/component/layout/footer/component.layout.footer";
import ComponentLayoutHeader from "../src/component/layout/header/component.layout.header";
import ComponentMain from "../src/component/main/component.main";
import ComponentMainList from "../src/component/main/component.main.list";

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