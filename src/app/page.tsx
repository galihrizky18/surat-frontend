import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1>Dashboard</h1>

      <Link
        href={"http://192.168.1.7:3000/login"}
        className="bg-blue-600 text-white px-10 py-2 w-20"
      >
        Login
      </Link>
    </div>
  );
}
