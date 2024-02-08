export {};

declare global {
  interface siteInfo {
    name: string;
    endpoint: string;
    categories: Array<string>;
    type: string;
  }
  interface SiteProps {
    title: string;
    description: string;
  }
}
