import Layout from "../components/layout/Layout";
import Spinner from "../components/ui/Spinner";
import useSeries from "../hooks/useSeries";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Table from "../components/ui/Table";

const LABELS = [
    { id: "Title", name: "Series name" },
    { id: "User", name: "User" },
    { id: "date", name: "Date", format: data => formatDistanceToNow(new Date(data.date)) }
]

export default function Home() {
    
    const { series, loading } = useSeries("lastRecords", "date");

    return (
        <>
            <Layout>
                <div className="py-12 bg-black">
                    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <p className="text-base leading-6 text-nflix font-semibold tracking-wide uppercase">
                                Videoclub
                            </p>
                            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-nflix sm:text-4xl sm:leading-10">
                                A better way to track your series
                            </h3>
                            <p className="mt-4 max-w-2xl text-xl leading-7 text-gray-200 lg:mx-auto">
                                Keep an updated list with information about the
                                series you have been finishing
                            </p>
                        </div>

                        {
                            loading ? (
                                <Spinner />
                            ) : (
                                <>
                                <h3 className="mt-10 mb-5 text-2xl leading-8 font-semibold tracking-tight text-nflix text-center">
                                    Last series added
                                </h3>

                                <Table
                                    labels={LABELS}
                                    data={series}
                                />
                                </>
                            )
                        }
                    </div>
                </div>
            </Layout>
        </>
    );
}
