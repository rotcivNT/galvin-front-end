import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import Navbar from '~/components/Header/Navbar/Navbar';
import NextAuthProvider from '~/components/NextAuthProvider/NextAuthProvider';
import AppProvider from '~/context/GlobalState';
import './globals.css';
export const metadata = {
  title: 'Galvin',
  description: 'Store sales clothes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <AppProvider>
            <Header>
              <Navbar />
            </Header>
            {children}
          </AppProvider>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
