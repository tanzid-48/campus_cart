import Link from "next/link";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-full mb-6">
        <AlertCircle size={48} className="text-teal-700 dark:text-teal-400" />
      </div>

      <h1 className="text-5xl font-extrabold text-amber-700 dark:text-amber-500">
        404
      </h1>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Oops! We could not find the page you are looking for.
      </p>

      <Link
        href="/"
        className="mt-8 px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-full transition-all hover:scale-105 active:scale-95"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
