import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found!',
  description: 'Error 404: Page not found.',
}

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-6xl font-extrabold text-darkPink">404</h2>
        <h1 className="text-4xl font-semibold mt-4">Page Not Found</h1>
        <p className="text-lg text-darkGrey mt-2 mb-4">There are no secrets here.</p>
        <Link className="hover:underline text-smokeyGrey  p-2 bg-lightPink rounded-full" href="/">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
