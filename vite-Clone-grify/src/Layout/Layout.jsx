
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
// outlet is used to render the child components of the layout component. The layout component is used to define the common layout for all the pages in the application. The child components are rendered inside the main tag of the layout component.

function Layout() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4"></div>
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
