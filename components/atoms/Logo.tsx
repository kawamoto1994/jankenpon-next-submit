interface LogoProps {
  srOnlySuffix?: string;
}

const Logo = (props: LogoProps) => {
  const { srOnlySuffix } = props;

  return (
    <h1 className="font-darumadrop text-5xl sm:text-7xl text-center">
      <span className="text-rose-500">じゃん</span>
      <span className="text-sky-500">けん</span>
      <span className="text-amber-500">ぽん</span>
      {srOnlySuffix && <span className="sr-only">{srOnlySuffix}</span>}
    </h1>
  );
};

export default Logo;
