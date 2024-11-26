import React from "react";
import Header from "@/ReuseComponets/User/Header";
import Footer from "@/ReuseComponets/User/Footer";
import RelatedProducts from "@/ReuseComponets/User/RelatedProduct";
import ProductDetail from "@/ReuseComponets/User/Purchase";

const PurchasePage = () => {
  return (
    <div>
      <Header />
      <div className="min-h-[calc(100vh-80px)]">
        <ProductDetail />
      </div>
      <RelatedProducts />
      <Footer />
    </div>
  );
};

export default PurchasePage;
