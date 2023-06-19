import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <ul>
        <li>
          <Link href="/checkbox">체크박스</Link>
        </li>
        <li>
          <Link href="/radio-group">라디오 그룹</Link>
        </li>
      </ul>
    </main>
  )
}
