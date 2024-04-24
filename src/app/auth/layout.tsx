interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return <section className="flex justify-center mt-24">{children}</section>;
};

export default Layout;
