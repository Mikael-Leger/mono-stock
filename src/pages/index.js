import Link from "next/link";

const title = "MONO'STOCK";

export default function Home() {
  return (
  <div className="home">
    <div className="title">{ title }</div>
    <Link href="/products">Products</Link>
  </div>)
}