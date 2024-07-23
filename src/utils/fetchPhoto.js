import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';

async function fetchPhotosUnsplash(product) {
  try {
    // console.log('Fetching photos for:', product); // Log product name
    const response = await axios.get(UNSPLASH_URL, {
      params: {
        query: product,
        client_id: UNSPLASH_ACCESS_KEY,
        per_page: 1 // Number of photos per request (you can adjust this)
      }
    });

    // Access the photos from the response
    // console.log('Photos fetched:', response.data.results); // Log the response data
    return response.data.results;
  } catch (error) {
    console.error('Error fetching photos:', error);
    // console.log('Response data:', error.response.data); // Log detailed response data if available
    return [];
  }
}

async function fetchPhotos(products) {
  const allPhotos = [];

  // Use Promise.all to fetch photos for all products concurrently
  const fetchPromises = products.map(async (product) => {
    const photos = await fetchPhotosUnsplash(product.product_name);
    return photos;
  });

  // Wait for all fetch operations to complete
  const results = await Promise.all(fetchPromises);

  // Flatten the results into a single array of photos
  results.forEach((photos) => {
    allPhotos.push(...photos);
  });

  return allPhotos;
}

export { fetchPhotos };
