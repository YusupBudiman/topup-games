import { Link } from "../../i18n/navigation";

export default function VipCard({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) {
  return (
    <article>
      <Link
        href={href}
        className={`
          relative w-full h-16 p-4 bg-linear-to-b from-[#98685e] to-[#57464c]  rounded-lg flex flex-col items-start gap-1 text-white`}
      >
        <header>
          <h2 className="text-[10px] font-semibold ">{title}</h2>
        </header>
        <p className="text-xs font-light">{desc}</p>
      </Link>
    </article>
  );
}
