export const getProducts = async () => {
  // 01 - PROMISE PATTERN

  // const data = fetch("http://localhost:8000/products", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // data
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => console.log(data))
  //   .catch((err) => console.log(err));

  // 02. ASYNC AWAIT PATTERN

  try {
    const res = await fetch("http://localhost:8000/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error while loading products");
  }
};

//RTK Queries
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `categories`,
    }),
  }),
});

export const { useGetCategoriesQuery } = Api;

// const products = [
//   {
//     categoryId: "1",
//     image: "/assets/products/airpods-max.png",
//     _id: "1",
//     name: "AirPods Max",
//     price: "549.00",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//   },
//   {
//     categoryId: "3",
//     image: "/assets/products/echo-dot.png",
//     _id: "2",
//     name: "Echo Dot",
//     price: "99.00",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//   },
//   {
//     categoryId: "2",
//     image: "/assets/products/pixel-buds.png",
//     _id: "3",
//     name: "Galaxy Pixel Buds",
//     price: "99.00",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//   },
//   {
//     categoryId: "1",
//     image: "/assets/products/quietcomfort.png",
//     _id: "4",
//     name: "Bose QuiteComfort",
//     price: "249.00",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//   },
//   {
//     categoryId: "3",
//     image: "/assets/products/soundlink.png",
//     _id: "5",
//     name: "Bose SoundLink",
//     price: "119.00",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//   },
//   {
//     categoryId: "5",
//     image: "/assets/products/apple-watch.png",
//     _id: "6",
//     name: "Apple Watch 9",
//     price: "699.00",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//   },
//   {
//     categoryId: "4",
//     image: "/assets/products/iphone-15.png",
//     _id: "7",
//     name: "Apple Iphone 15",
//     price: "1299.00",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//   },
//   {
//     categoryId: "4",
//     image: "/assets/products/pixel-8.png",
//     _id: "8",
//     name: "Galaxy Pixel 8",
//     price: "549.00",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//   },
// ];
