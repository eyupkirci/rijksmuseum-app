export interface ImageInfo {
  guid: string;
  offsetPercentageX: number;
  offsetPercentageY: number;
  width: number;
  height: number;
  url: string;
}

export interface ArtObject {
  links: {
    self: string;
    web: string;
  };
  id: string;
  objectNumber: string;
  title: string;
  hasImage: boolean;
  principalOrFirstMaker: string;
  longTitle: string;
  showImage: boolean;
  permitDownload: boolean;
  webImage: ImageInfo;
  headerImage: ImageInfo;
  productionPlaces: string[];
}

export type FacetItem = {
  key: string;
  value?: number;
};

export type Facet = {
  name: string;
  facets: FacetItem[];
};

export type TSortOptions =
  | "relevance"
  | "objecttype"
  | "chronologic"
  | "achronologic"
  | "artist"
  | "artistdesc";
export interface IQuery {
  q?: string;
  p?: number;
  ps?: number;
  color?: string;
  maker?: string;
  material?: string;
  s?: TSortOptions;
}
export type QueryKeys = keyof IQuery;
export interface AppState {
  isLoading: boolean;
  query: IQuery;
  data: ArtObject[];
}
