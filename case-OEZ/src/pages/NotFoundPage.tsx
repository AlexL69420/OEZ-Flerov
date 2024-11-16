import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col gap-2">
      <div>404 Not Found</div>
      <div>
        <Link to="/" className="underline">
          go back to homepage
        </Link>
      </div>
    </div>
  );
}
