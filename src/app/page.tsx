import Link from "next/link";
const projectHost = process.env.NEXT_PUBLIC_HOST;

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1>Dashboard</h1>

      <Link
        href={`${projectHost}/login`}
        className="bg-blue-600 text-white px-10 py-2 w-20"
      >
        Login
      </Link>
    </div>
  );
}
