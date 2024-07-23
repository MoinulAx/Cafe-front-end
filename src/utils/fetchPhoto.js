import axios from 'axios';

const UNSPLASH_ACCESS_KEY = '5z8OygGxzGdDOAMcJT2s8EcnRAfP_2EyUm0crNdA4oc';
const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';

async function fetchPhotosUnsplash(product) {
    try {
      const response = await axios.get(UNSPLASH_URL, {
        params: {
          query: product,
          client_id: UNSPLASH_ACCESS_KEY,
          per_page: 1 // Number of photos per request (you can adjust this)
        }
      });
  
      // Access the photos from the response
      return response.data.results;
    } catch (error) {
      console.error('Error fetching photos:', error);
      return [];
    }
}

// Function to fetch multiple items using different keywords
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

export { fetchPhotos }