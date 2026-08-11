import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  // =========================
  // User states
  // =========================
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState("");

  // =========================
  // Product states
  // =========================
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(true);
  const [productError, setProductError] = useState("");

  // =========================
  // Search state
  // =========================
  const [search, setSearch] = useState("");

  // =========================
  // Task 1, 2, 3, 4, 5, 6
  // Fetch Users API
  // =========================
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        return response.json();
      })
      .then((data) => {
        // Task 1: Print users in console
        console.log("Users API Data:", data);

        setUsers(data);
        setUserLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setUserError(error.message);
        setUserLoading(false);
      });
  }, []);

  // =========================
  // Task 7
  // Fetch Products API
  // =========================
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Products API Data:", data);

        setProducts(data);
        setProductLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setProductError(error.message);
        setProductLoading(false);
      });
  }, []);

  // =========================
  // Task 9
  // Search API data
  // =========================
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>API Dashboard</h1>

      {/* =================================
          TASK 2, 3, 4, 5, 6
          Users Section
      ================================== */}

      <section>
        <h2>Users</h2>

        {/* Task 5: Loading message */}
        {userLoading && <p>Loading users...</p>}

        {/* Task 6: Error handling */}
        {userError && <p className="error">Error: {userError}</p>}

        {/* Task 2, 3, 4: Display first 5 users */}
        {!userLoading && !userError && (
          <div className="user-list">
            {users.slice(0, 5).map((user) => (
              <div className="user-card" key={user.id}>
                {/* Task 2 */}
                <h3>{user.name}</h3>

                {/* Task 3 */}
                <p>{user.email}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =================================
          TASK 7, 8, 9
          Products Section
      ================================== */}

      <section>
        <h2>Products</h2>

        {/* Task 9: Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Loading */}
        {productLoading && <p>Loading products...</p>}

        {/* Error */}
        {productError && (
          <p className="error">Error: {productError}</p>
        )}

        {/* Task 8: Product Cards */}
        {!productLoading && !productError && (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.title} />

                <h3>{product.title}</h3>

                <p className="price">${product.price}</p>

                <p>{product.category}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =================================
          TASK 10
          API Dashboard
      ================================== */}

      <section className="dashboard">
        <h2>Dashboard Summary</h2>

        <div className="stats">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>

          <div className="stat-card">
            <h3>Total Products</h3>
            <p>{products.length}</p>
          </div>

          <div className="stat-card">
            <h3>Products Found</h3>
            <p>{filteredProducts.length}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;