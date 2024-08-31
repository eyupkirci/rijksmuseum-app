import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.BASE_URL;
const API_KEY = import.meta.env.API_KEY;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    // Define a query to fetch artworks based on search query
    fetchArtworks: builder.query({
      query: (query: string) => `collection?key=${API_KEY}&q=${query}`,
    }),
    // Define an endpoint to fetch details of a specific artwork
    fetchArtworkById: builder.query({
      query: (id: string) => `collection/${id}?key=${API_KEY}`,
    }),
  }),
});

export const { useFetchArtworksQuery, useFetchArtworkByIdQuery } = apiSlice;
