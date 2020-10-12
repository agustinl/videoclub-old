import Header from './Header';
import Head from 'next/head';

const Layout = props => {
    return (
        <>
            <Head>
                <title>Videoclub</title>
                <link rel="icon" href="/static/favicon.png" type="image/png" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
            </Head>

            <Header />
            
            <div className="flex h-full justify-center items-center flex-col bg-black mt-5">
                {props.children}
            </div>
        </>
    );
}
 
export default Layout;