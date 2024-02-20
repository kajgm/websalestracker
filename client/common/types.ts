export interface TSite {
  name: string; //unique
  endpoint: string;
  type: string;
  labels: Array<string>;
}

export interface TCategory {
  name: string; //unique
  siteNames: Array<string>;
  siteLabels: Array<string>;
}

export interface TItem {
  id: number; //unique
  title: string; //NOT unique
  description: string;
  url: string;
  siteName: string;
  categoryName: string;
}
