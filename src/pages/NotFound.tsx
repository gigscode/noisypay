import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="container mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">The page you requested does not exist.</p>
      <p className="mt-6"><Link to="/" className="underline">Go home</Link></p>
    </section>
  );
};

export default NotFound;


