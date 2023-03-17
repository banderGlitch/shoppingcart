import { Inter } from "@next/font/google";
import { useContext } from "react";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/Store";
import axios from "axios";
import { toast } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });
// https://www.youtube.com/watch?v=_IBlyR5mRzA
// https://github.com/basir/next-tailwind-amazona/tree/main/pages
// timestamp -2:54:02 create shipping address 
// using mongodb tailwind
// mongodb atlas credentials
// nernaykumar98@gmail.com 
// database
// Add User Menu
// Completely unstyled, full
export default function Home({ products }) {
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`)
    if (data.countInStock < quantity) {
      alert("Sorry Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    toast.success("Product added to the Cart")

  };
  return (
    <>
      <Layout title="Home Page">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductItem product={product} key={product.slug} addToCartHandler={addToCartHandler} />
          ))}
        </div>
      </Layout>
    </>
  );
}
// to fetch the data from the server side props
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    }
  }

}