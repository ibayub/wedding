// pages/_app.tsx
import '../styles/globals.css'; // This is where TailwindCSS global styles are imported

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
