export function addArticle(payload) {
  return { type: 'switch_page', payload };
}

export function fetchImages(payload) {
  return { type: 'fetchImages', payload };
}
