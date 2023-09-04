function ListProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100vh] lg:max-w-[960px] xl:max-w-6xl mx-5 md:mx-8 mt-[100px] xl:mx-auto lg:mt-[160px]">
      {children}
    </div>
  );
}

export default ListProductLayout;
