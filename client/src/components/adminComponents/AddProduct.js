import { checkbox } from "../data/dummyData";
import { createProduct, uplaodFile } from "./helperFunctions";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { config } from "../utils/toastConfig";

const AddProduct = () => {
  const [formVals, setFormVals] = useState({
    name: "",
    price: "",
    sale: "",
    desc: "",
    img: null,
    cat: "",
  });

  const { name, price, sale, desc, img, cat } = formVals;

  console.log(img);

  const { user } = useSelector((state) => state.auth);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Parse to number prices for db
    let priceNum = parseInt(price);
    let priceSale = parseInt(sale);

    const newProduct = {
      title: name,
      price: priceNum,
      text: desc,
      sale: priceSale,
      image: img,
      category: cat,
    };

    if (img) {
      const data = new FormData();
      const fileNameStored = Date.now() + "-addedProd" + img.name;

      data.append("name", fileNameStored);
      data.append("file", img);
      newProduct.image = fileNameStored;

      try {
        // upload img
        await uplaodFile(data);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong with uploading image 💩", config);
      }
    }

    // Creating a product
    try {
      if (
        newProduct.image !== null &&
        newProduct.title !== "" &&
        newProduct.price !== 0 &&
        newProduct.text !== "" &&
        newProduct.category !== ""
      ) {
        await createProduct(
          newProduct.title,
          newProduct.image,
          newProduct.text,
          newProduct.price,
          newProduct.sale,
          newProduct.category,
          user.accessToken
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, product wasn't created 💩", config);
    }
  };

  // Value on Change
  const onChange = (e) => {
    setFormVals((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(formVals);

  return (
    <div className="flex justify-center items-center">
      <div className="w-7/12 ">
        <div className="h-96">
          {img ? (
            <img
              className="w-full h-full object-contain"
              src={URL.createObjectURL(img)}
            />
          ) : (
            <img className="w-full h-full" src="https://plchldr.co/i/500x250" />
          )}
        </div>
        <form onSubmit={onSubmit} className="flex flex-col">
          <label htmlFor="file">Upload Product Image *</label>
          <input
            onChange={(e) => setFormVals({ img: e.target.files[0] })}
            type="file"
            name="file"
            required
            accept=".png,.jpeg,.jpg"
            className="mb-2"
          />
          <label htmlFor="name">Name *</label>
          <input
            onChange={onChange}
            value={name}
            name="name"
            className="border-2 outline-none border-p-primary rounded-full p-2"
            placeholder="Enter Name..."
            required
          />
          <label htmlFor="price">Price(max 7 characters) *</label>
          <input
            onChange={onChange}
            value={price}
            name="price"
            className="border-2 outline-none border-p-primary rounded-full p-2"
            type="text"
            placeholder="Enter price..."
            required
            maxLength="7"
            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
          />
          <label htmlFor="sale">Sale(max 7 characters) </label>
          <input
            onChange={onChange}
            value={sale}
            name="sale"
            className="border-2 outline-none border-p-primary rounded-full p-2"
            placeholder="Sale Price..."
            type="text"
            maxLength="7"
            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
          />
          <label htmlFor="desc">Description(max 500 characters) *</label>
          <input
            onChange={onChange}
            name="desc"
            value={desc}
            className="border-2 outline-none border-p-primary rounded-full p-2"
            placeholder="Description..."
            required
            type="text"
            maxLength="500"
          />
          <label htmlFor="cat">Select Category *</label>
          <select
            onChange={onChange}
            name="cat"
            value={cat}
            required
            className="p-2 border-2 border-p-primary rounded-xl w-fit"
          >
            {checkbox.map((category) => (
              <option key={category.id} value={category.name.toLowerCase()}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            className="border-2 border-p-primary rounded-xl p-2 w-fit my-2"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
