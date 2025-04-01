import React from "react";
import FeaturedProducts from "../components/FeaturedProducts";

const AdminPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <FeaturedProducts />
      </main>
    </div>
  );
};
export default AdminPage;
