// pages/_app.tsx
import '../styles/globals.css'; // Ścieżka do pliku z globalnymi stylami

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;