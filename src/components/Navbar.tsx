const modules = [
  {
    id: 1,
    slug: "",
    title: "TOKEN FREEZE & TOKEN THAW",
  },
  {
    id: 2,
    slug: "",
    title: "AUGMENTED BONDING CURVE",
  },
  {
    id: 3,
    slug: "",
    title: "MODIFYING THE COMMONS",
  },
  {
    id: 4,
    slug: "",
    title: "REQUESTING FUNDS",
  },
];

function Navbar() {
  return (
    <div className="flex bg-transparent items-center">
      <div className="bg-neon px-5 py-10">
        <img src="/assets/tec-logo-light.svg" alt="TEC Logomark" />
      </div>
      <div className="ml-8 mr-16">
        <img src="/assets/tec-text-light.svg" alt="Token Engineering Commons" />
      </div>
      <div className="hidden lg:flex">
        {modules.map(({ id, title }) => (
          <div className="flex items-center mx-4 text-white" key={id}>
            <span className="text-5xl mr-4">{id}</span>
            <h3 className="text-xs w-28">{title}</h3>
          </div>
        ))}
      </div>
      <button className="font-bj font-bold text-xs text-neon uppercase ml-auto pr-16">
        advanced settings
      </button>
    </div>
  );
}

export default Navbar;
