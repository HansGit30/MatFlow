interface SidebarSectionProps {
    title: string;
    children: React.ReactNode;
  }
  
  const SidebarSection = ({
    title,
    children,
  }: SidebarSectionProps) => {
    return (
      <div className="mb-5">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </p>
  
        <div className="space-y-1">
          {children}
        </div>
      </div>
    );
  };
  
  export default SidebarSection;