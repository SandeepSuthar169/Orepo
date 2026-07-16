// NotFound.jsx
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F3F5F7] px-4">
            <div className="text-center">
                <h1 className="text-7xl font-black text-gray-300 md:text-9xl">
                    404
                </h1>
                <p className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl">
                    Page Not Found
                </p>
                <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                    Oops! The page you are looking for does not exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block mt-8 px-6 py-3 text-sm font-medium text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors duration-200 shadow-sm"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;

