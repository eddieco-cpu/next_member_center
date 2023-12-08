import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <section class="header_container">
        <nav>
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/profile">Profile</Link>
        </nav>
      </section>
    </header>
  );
}
