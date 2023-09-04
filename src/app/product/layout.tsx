function ProductDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100vh] lg:max-w-[960px] xl:max-w-full mx-5 md:mx-8 xl:mx-10 xl:mt-[100px]">
      {children}
    </div>
  );
}

export default ProductDetailLayout;
