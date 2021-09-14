import Link from 'next/link';

function Header() {
  return (
    <div className="flex bg-black-100">
      <img
        className="bg-neon px-5 py-10"
        src="/assets/tec-logo-light.svg"
        alt="TEC Logomark"
      />
      <div className="flex items-center justify-between w-full px-6 lg:px-12">
        <img
          className=""
          src="/assets/tec-text-light.svg"
          alt="Token Engineering Commons"
        />
        <Link href="/">
          <a className="text-bj text-sm text-neon font-bold transition hover:text-neon-100">
            TAKE ME BACK
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Header;
