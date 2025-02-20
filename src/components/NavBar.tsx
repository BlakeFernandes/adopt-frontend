import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full flex justify-between items-center">
      <h1 className="text-2xl font-semibold mb-4">Adopt a Puppy</h1>
      <div className="flex gap-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Home
        </Link>
      </div>
    </nav>
  );
}
