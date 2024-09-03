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
