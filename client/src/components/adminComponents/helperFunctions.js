import { toast } from "react-toastify";
import { config } from "../utils/toastConfig";

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
    const req = await fetch("/api/products/addProduct", {
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
    if (req.status === 200) {
      await toast.success("Product was added successfully 😃", config);
    } else if (req.status === 500) {
      toast.error("Server error💩", config);
    } else {
      toast.error("You can't do that 💩", config);
    }
  } catch (error) {
    console.log(error);
    toast.error("You can't do that 💩", config);
  }
};

export const deleteProduct = async (id, verifyToken) => {
  try {
    await fetch(`/api/products/delete/${id}`, {
      method: "DELETE",
      headers: {
        token: `Bearer ${verifyToken}`,
        "Content-Type": "application/json",
      },
    });
    await toast.success("Product was deleted", config);

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } catch (error) {
    console.log(error);
    toast.error("You can't do that 💩", config);
  }
};
