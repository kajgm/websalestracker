export interface SiteData {
  name: string;
  endpoint: string;
  type: string;
  categories: Array<string>;
}

export interface SiteItem {
  id: string;
  title: string;
  url: string;
  description: string;
}
