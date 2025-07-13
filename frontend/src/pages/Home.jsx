import React, { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (products.length <= 0) {
    return (
      <div className="flex items-center justify-center mt-60 ">
        <p className="text-3xl">loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-4 md:mx-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {currentProducts.map((product) => (
          <div key={product.id} className="p-3 border-2 rounded-2xl">
            <h3>{product.title}</h3>
            <img src={product.image} alt={product.title} width={100} />
            <p>${product.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center my-6 gap-4">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-2 bg-blue-700 text-white cursor-pointer rounded-xl"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
