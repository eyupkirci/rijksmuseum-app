import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IQuery } from "../types";

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
      query: (query: string, ps?: number, p?: number) =>
        `collection?key=${API_KEY}&q=${query}&imgonly=True&p=${p ?? 1}&ps=${ps ?? 50}&s=relevance`,
    }),
    fetchArtworksByHex: builder.query({
      query: (query: string, ps?: number, p?: number) => {
        const encodedQuery = encodeURIComponent(query);
        return `collection?key=${API_KEY}&imgonly=True&f.normalized32Colors.hex=${encodedQuery}&p=${
          p ?? 1
        }&ps=${ps ?? 50}&s=relevance`;
      },
    }),
    fetchArtworksByMaker: builder.query({
      query: (query: string, ps?: number, p?: number) => {
        return `collection?key=${API_KEY}&imgonly=True&involvedMaker=${query}&p=${p ?? 1}&ps=${
          ps ?? 50
        }&s=relevance`;
      },
    }),
    fetchArtworkById: builder.query({
      query: (id: string) => `collection/${id}?key=${API_KEY}`,
    }),
    fetchUltimateArtworks: builder.query({
      query: ({ q, ps, p, color, maker, material, s }: IQuery) => {
        let base = `collection?key=${API_KEY}&imgonly=True&p=${p ?? 1}&ps=${ps ?? 20}`;

        if (q) {
          base += `&q=${q}`;
        }

        if (color) {
          const encodedQuery = encodeURIComponent(color);
          base += `&f.normalized32Colors.hex=${encodedQuery}`;
        }

        if (maker) {
          base += `&involvedMaker=${maker}`;
        }

        if (material) {
          base += `&material=${material}`;
        }

        if (s) {
          base += `&s=${s}`;
        }

        return base;
      },
    }),
  }),
});

export const {
  useFetchArtworksQuery,
  useFetchArtworkByIdQuery,
  useFetchArtworksByMakerQuery,
  useFetchArtworksByHexQuery,
  useFetchUltimateArtworksQuery,
} = apiSlice;
