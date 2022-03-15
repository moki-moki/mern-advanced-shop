const getPreviewProducts = async () => {
  const req = await fetch("/api/products");
  const res = await req.json();
  return res;
};

const getShowcaseProucts = async (params) => {
  const req = await fetch(`/api/products/allProducts?${params}`);
  const res = await req.json();
  return res;
};

const getSingleProduct = async (id) => {
  const req = await fetch(`/api/products/${id}`);
  const res = await req.json();
  return res;
};

const productServices = {
  getPreviewProducts,
  getShowcaseProucts,
  getSingleProduct,
};

export default productServices;
