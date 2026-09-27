interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = ({
  children,
}: PageContainerProps) => {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-6 py-6">
      <div className="mx-auto max-w-[1600px]">
        {children}
      </div>
    </main>
  );
};

export default PageContainer;