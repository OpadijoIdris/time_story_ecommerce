import { useEffect, useState } from "react";
import { getAllProducts, getAllUsers } from "../../../api";

export default function Dashboard() {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const products = await getAllProducts();
        setProductCount(products.length);

        const users = await getAllUsers();
        setUserCount(users.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    { title: "Total Products", value: productCount },
    { title: "Customers", value: userCount },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-5 rounded-xl shadow-md text-center">
          <h3 className="text-gray-500">{stat.title}</h3>
          <p className="text-2xl font-semibold mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
