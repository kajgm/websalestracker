const defaultSites = [
  {
    id: 'reddit',
    endpoint: 'https://www.reddit.com/r/',
    type: '.json',
    labels: ['bapcsalescanada', 'frugalmalefashioncdn', 'buildapcsales', 'frugalmalefashion']
  },
  { id: 'test', endpoint: 'https://test/', labels: ['label1', 'label2', 'label3'], type: '.json' }
];

const defaultCategories = [
  { id: 'technology', siteIds: ['reddit'], siteLabels: ['bapcsalescanada', 'buildapcsales'] },
  { id: 'clothing', siteIds: ['reddit'], siteLabels: ['frugalmalefashioncdn', 'frugalmalefashion'] }
];

export { defaultSites, defaultCategories };
