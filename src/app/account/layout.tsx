function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100vh] lg:max-w-[960px] xl:max-w-6xl mx-5 md:mx-8 xl:mx-auto mt-[100px] md:mt-[140px]">
      {children}
    </div>
  );
}

export default Layout;
