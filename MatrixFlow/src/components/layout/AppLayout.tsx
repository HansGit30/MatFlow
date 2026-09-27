import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Breadcrumbs from "./Breadcrumbs";
import PageContainer from "./PageContainer";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ==========================================
          OVERLAY MOBILE
      ========================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <div
        className={
          sidebarOpen
            ? "fixed left-0 top-0 z-50 block"
            : "fixed left-0 top-0 z-50 hidden lg:block"
        }
      >
        <Sidebar />
      </div>


      {/* ==========================================
          HEADER
      ========================================== */}

      <Header
        onMenuClick={() => setSidebarOpen(true)}
      />


      {/* ==========================================
          CONTENIDO PRINCIPAL
      ========================================== */}

      <div className="ml-64 pt-16">

        <PageContainer>

          <Breadcrumbs />

          <Outlet />

        </PageContainer>

      </div>

    </div>
  );
};

export default AppLayout;