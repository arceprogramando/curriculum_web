const SITE_HOSTS = new Set(['arceprog.dev', 'www.arceprog.dev']);

function isExternalHref(href) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false;
  }

  if (href.startsWith('/') && !href.startsWith('//')) {
    return false;
  }

  try {
    const url = new URL(href, 'https://arceprog.dev');
    return !SITE_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

function visit(node, fn) {
  if (!node || typeof node !== 'object') return;

  if (node.type === 'element' && node.tagName === 'a') {
    fn(node);
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      visit(child, fn);
    }
  }
}

/** Adds target="_blank" and rel="noopener noreferrer" to external links in markdown. */
export function rehypeExternalLinks() {
  return (tree) => {
    visit(tree, (node) => {
      const href = node.properties?.href;

      if (typeof href !== 'string' || !isExternalHref(href)) return;

      node.properties.target = '_blank';
      node.properties.rel = 'noopener noreferrer';
    });
  };
}
