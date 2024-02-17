export interface SiteData {
  name: string;
  endpoint: string;
  type: string;
  categories: Array<string>;
}

export interface SiteCategory {
  name: string;
  site: string;
  ids: Array<string>;
}

export interface SiteItem {
  name: string;
  site: string;
  category: string;
  url: string;
  description: string;
}
