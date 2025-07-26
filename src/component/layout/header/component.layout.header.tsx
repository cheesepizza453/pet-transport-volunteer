import ComponentSvgHamburger from "../../svg/component.svg.hamburger";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import useStoreContent from "../../../store/store.content";

declare global {
    interface Window {
        Kakao: any;
    }
}

function ComponentLayoutHeader() {
    const inLogin = useStoreContent(state => state.inLogin);
    const setInLogin = useStoreContent(state => state.setInLogin);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        }
    }, []);

    const handleKakaoLogin = () => {
        if (!window.Kakao) return;
        const Kakao = window.Kakao;

        Kakao.Auth.login({
            success: (authObj: any) => {
                console.log("✅ 로그인 성공", authObj);

                Kakao.API.request({
                    url: "/v2/user/me"
                })
                    .then(function (response:any) {
                        console.log("🙋 사용자 정보:", response);
                        setInLogin(true)
                    })
                    .catch(function (error:any) {
                        console.log("❌ 사용자 정보 요청 실패:", error);
                    });
            },
            fail: (err: any) => console.error("❌ 로그인 실패", err),
        });
    };


    const handleKakaoLogout = () => {
        const Kakao = window.Kakao;
        if (!Kakao) return;

        Kakao.Auth.logout(() => {
            console.log("👋 로그아웃 완료");
            setInLogin(false)
        });
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
      <>
          {/* 카카오 SDK 로딩 */}
          <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            strategy="beforeInteractive"
          />

          <div
            className={"fixed top-0 left-0 flex justify-between items-center w-full h-[54px] px-[20px] z-[1000] bg-white"}>
              <a href={"/"}>
                  <figure className={"w-[40px] h-[40px]"}>
                      <Image src={"/img/logo.png"} alt="" width={40} height={40}/>
                  </figure>
              </a>
              <div className={"cursor-pointer"} onClick={() => setIsOpen(true)}>
                  <figure className={"w-[25px] h-[25px]"}>
                      <ComponentSvgHamburger/>
                      <figcaption></figcaption>
                  </figure>
              </div>
          </div>
          <span className={'block h-[56px]'}></span>

          {isOpen && (
            <div
              onClick={() => {
                  setIsOpen(false);
              }}
              className={
                  "fixed flex justify-center top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[10]"
              }
            >
                <div className={"max-w-[720px] w-full mx-auto h-full relative"}>
                    <div
                      onClick={handleClick}
                      className={
                          "flex flex-col justify-between absolute py-[100px] px-[50px] top-0 right-0 w-[60%] min-w-[300px] h-[100dvh] bg-white z-[20]"
                      }
                    >
                        <h1 className={"font-30 font-pretendard font-light"}>
                            <p>국내</p>
                            <strong className={"block mt-[5px] w-full font-bold"}>
                                반려동물 <br/>이동봉사
                            </strong>
                        </h1>
                        {inLogin ? (
                          <div>
                              <button
                                className={'mt-[5px]'} type={'button'} onClick={() => {
                                  handleKakaoLogout()
                              }}>
                                  <p className={'font-14 underline text-blue-600'}>로그아웃</p>
                              </button>
                          </div>
                        ) : (
                          <button
                            onClick={handleKakaoLogin}
                            type={"button"}
                            className={
                                "mt-[20px] w-[150px] h-[55px]"
                            }
                          >
                              <figure>
                                  <Image
                                    src={"/img/kakao-login.jpg"}
                                    alt={"카카오 로그인"}
                                    width={222}
                                    height={55}
                                  />
                              </figure>
                          </button>
                        )
                        }

                    </div>
                </div>
            </div>
          )}
      </>
    );
}

export default ComponentLayoutHeader;
