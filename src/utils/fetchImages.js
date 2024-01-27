'use server'
const unsplashAccessKey  = process.env.SPLASH_API;
const unsplashApiUrl = `https://api.unsplash.com/`;

export const getImagesForProduct = async (query, count) => {
  try {
    const response = await fetch(
        `${unsplashApiUrl}/search/photos?query=${query}&client_id=${unsplashAccessKey}&per_page=${count}`
      );

    if (!response.ok) return []

    const data = await response.json();
    const imageUrls = data?.results?.map((result) => result?.urls?.regular);
    return imageUrls;
    
  } catch (error) {
    return [];
  }
};
