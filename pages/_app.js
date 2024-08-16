import 'bootstrap/dist/css/bootstrap.min.css';
import "../app/globals.css";
import '@radix-ui/themes/styles.css';
import Navbar from '@/components/Navbar';
import AppFooter from '@/components/Footer';
import Nav from "@/components/shadeui/Nav";
import { AuthProvider } from '@/contexts/AuthContext';
import { Theme } from '@radix-ui/themes';
import { Toaster } from "@/components/ui/toaster";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Theme appearance="light" >
        <main>
          <Nav />
          <Component {...pageProps} />
          <AppFooter />
          <Toaster />
        </main>
      </Theme>
    </AuthProvider>
  );
}

export default MyApp;