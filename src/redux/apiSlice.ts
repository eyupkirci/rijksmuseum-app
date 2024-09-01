import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["image", "text"],

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    fetchArtworks: builder.query({
      query: (query: string) => `collection?key=${API_KEY}&q=${query}`,
    }),
    fetchArtworksByMaker: builder.query({
      query: (query: string) => `collection?key=${API_KEY}&involvedMaker=${query}`,
    }),
    fetchArtworksByHex: builder.query({
      query: (query: string) => {
        const encodedQuery = encodeURIComponent(query);
        return `collection?key=${API_KEY}&f.normalized32Colors.hex=${encodedQuery}`;
      },
    }),
    fetchArtworkById: builder.query({
      query: (id: string) => `collection/${id}?key=${API_KEY}`,
    }),
  }),
});

export const {
  useFetchArtworksQuery,
  useFetchArtworkByIdQuery,
  useFetchArtworksByHexQuery,
  useFetchArtworksByMakerQuery,
} = apiSlice;
