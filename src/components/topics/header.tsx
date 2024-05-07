interface HeaderProps {
  title: string;
  label: string;
}
const Header = ({ title, label }: HeaderProps) => {
  return (
    <div className=" w-full flex flex-col gap-y-4 ">
      <h1 className=" text-xl font-semibold uppercase">{title}</h1>
      <p className=" text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default Header;
