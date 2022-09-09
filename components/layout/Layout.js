import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';

export default function Layout (props) {
    return (
        <>
            <Head>
                <title>Videoclub</title>
                <link rel="icon" href="/favicon.png" type="image/png" />
                <meta name="description" content="Keep an updated list with information about the series you have been finishing"></meta>
            </Head>

            <Header />
            
            <div className="flex h-full justify-center items-center flex-col bg-black mt-5">
                {props.children}
            </div>

            <Footer />
        </>
    );
}