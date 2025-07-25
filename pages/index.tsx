import React from 'react';
import ComponentLayoutFooter from "../src/component/layout/footer/component.layout.footer";
import ComponentLayoutHeader from "../src/component/layout/header/component.layout.header";
import ComponentMain from "../src/component/main/component.main";

export default function Home() {
    return (
        <>
            <div className={'bg-gray-950 min-h-[100vh]'}>
                <div className={'relative max-w-[720px] mx-auto min-h-[100vh] bg-white'}>
                    <ComponentLayoutHeader/>
                    <ComponentMain/>
                    {/*<ComponentLayoutFooter/>*/}
                </div>
            </div>
        </>
    );
}