export const uplaodFile = async (data) => {
  console.log(data);

  try {
    const req = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });
    return await req.json();
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (
  title,
  image,
  text,
  price,
  sale,
  category,
  token
) => {
  try {
    await fetch("/api/products/addProduct", {
      method: "POST",
      headers: {
        token: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        image,
        price,
        sale,
        text,
        category,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
