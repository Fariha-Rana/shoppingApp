'use server'
const unsplashAccessKey  = process.env.SPLASH_API;
const unsplashApiUrl = `https://api.unsplash.com/`;

export const getImagesForProduct = async (query = "women clothes", count = 20) => {
  try {
    const response = await fetch(
        `${unsplashApiUrl}/search/photos?query=${query}&client_id=${unsplashAccessKey}&per_page=${count}`
      );

    if (!response.ok) {
      console.log(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Extract image URLs from the response
    const imageUrls = data.results.map((result) => result.urls.regular);
    return imageUrls;
  } catch (error) {
    console.error('Error fetching images from Splash API:', error.message);
    return [];
  }
};
