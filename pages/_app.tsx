import 'styles/global.css';
import type { AppProps } from 'next/app';

export default function _app({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}