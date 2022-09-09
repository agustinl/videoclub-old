import Link from "next/link";

const Footer = () => {
	return (
		<footer className="p-4 bg-transparent rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
			<div className="sm:flex sm:items-center sm:justify-between">
				<Link href="/">
					<img src="/static/logo-videoclub.png" alt="Videoclub" class="mr-3 h-6" />
				</Link>
				<ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
					<li>
						<a
							href="https://github.com/agustinl/videoclub"
							className="mr-4 hover:underline md:mr-6 "
						>
							GitHub Repository
						</a>
					</li>
				</ul>
			</div>
			<hr className="my-6 border-neutral-800 sm:mx-auto dark:border-gray-700 lg:my-8" />
			<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
				{new Date().getFullYear()} Videoclub
			</span>
		</footer>
	);
};

export default Footer;
