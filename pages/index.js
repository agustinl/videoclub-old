import Layout from "../components/layout/Layout";
import Spinner from "../components/ui/Spinner";
import useSeries from "../hooks/useSeries";
import Link from "next/link";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function Home() {
    
    const { series, loading } = useSeries("lastRecords", "date");

    return (
        <>
            <Layout>
                <div className="py-12 bg-black">
                    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <p className="text-base leading-6 text-red-400 font-semibold tracking-wide uppercase">
                                Videoclub
                            </p>
                            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-red-700 sm:text-4xl sm:leading-10">
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
                                <h3 className="mt-10 mb-5 text-2xl leading-8 font-semibold tracking-tight text-red-700 text-center">
                                    Last series added
                                </h3>

                                <table className="table-auto text-white mt-10 mx-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">Series name</th>
                                            <th className="px-4 py-2">User</th>
                                            <th className="px-4 py-2">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {series.map((serie) => (
                                            <tr key={serie.date}>
                                                <td className="border px-4 py-2">
                                                    <strong>{serie.Title}</strong>
                                                </td>
                                                <td className="border px-4 py-2">
                                                    <Link
                                                        href={`/series/${serie.User}`}
                                                    >
                                                        <a className="text-red-700 hover:underline">
                                                            @{serie.User}
                                                        </a>
                                                    </Link>
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {formatDistanceToNow(
                                                        new Date(serie.date)
                                                    )}{" "}
                                                    ago
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                </>
                            )
                        }
                    </div>
                </div>

                <div className="border-t border-b border-red-700 text-white px-4 py-3 mt-10 w-1/2 mx-auto text-center" role="alert">
                    <p className="text-sm"><a className="text-red-700 hover:underline" href="https://github.com/agustinl/videoclub">GitHub</a> &#8212; {new Date().getFullYear()} Videoclub</p>
                </div>
            </Layout>
        </>
    );
}
