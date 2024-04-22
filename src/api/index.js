export const fetchCategory = async () => {
  const response = await fetch("http://localhost:3000/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

export const fetchProduct = async () => {
    const response = await fetch("http://localhost:3000/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    return await response.json();
  };
