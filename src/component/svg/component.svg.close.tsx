
type IProps = {
  fill?: string;
}

function ComponentSvgClose(props:IProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20" fill="none">
      <path fillRule="evenodd" clipRule="evenodd"
            d="M19.0658 1.30552C19.5823 1.81204 19.4937 2.7201 18.868 3.33374L3.00608 18.8889C2.38035 19.5025 1.45438 19.5893 0.937872 19.0828C0.421365 18.5763 0.509911 17.6682 1.13565 17.0546L16.9975 1.49947C17.6233 0.885841 18.5493 0.799007 19.0658 1.30552Z"
            fill={props.fill || 'black'}/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M0.940758 0.917132C1.45727 0.410614 2.38323 0.497448 3.00897 1.11108L18.8709 16.6662C19.4966 17.2799 19.5852 18.1879 19.0686 18.6944C18.5521 19.201 17.6262 19.1141 17.0004 18.5005L1.13853 2.94535C0.512798 2.33171 0.424252 1.42365 0.940758 0.917132Z"
            fill={props.fill || 'black'}/>
    </svg>
  )
}

export default ComponentSvgClose;
