import '../styles/index.css';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <main className="p-8">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}

export default MyApp;
