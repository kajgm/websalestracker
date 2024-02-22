export interface TSite {
  id: string;
  endpoint: string;
  type: string;
  labels: Array<string>;
}

export interface TCategory {
  id: string;
  siteIds: Array<string>;
  siteLabels: Array<string>;
}

export interface TItem {
  id: string; //unique
  title: string; //NOT unique
  description: string;
  url: string;
  price: number;
  siteId: string;
  categoryId: string | undefined;
}
