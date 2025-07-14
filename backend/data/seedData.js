const categories = [
  { name: "Electronics" },
  { name: "Fashion" },
  { name: "Home & Kitchen" }
];

// Helper to generate random image
const getRandomImage = () => `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/600/400`;

// Sample products
const products = Array.from({ length: 10 }).map((_, i) => {
  const catNames = ["Electronics", "Fashion", "Home & Kitchen"];
  const randomCat = catNames[Math.floor(Math.random() * catNames.length)];

  return {
    name: `Sample Product ${i + 1}`,
    image: getRandomImage(),
    brand: `Brand ${i + 1}`,
    quantity: Math.floor(Math.random() * 100) + 1,
    category: randomCat, // This will be replaced with ObjectId in seed.js
    description: `This is the description for product ${i + 1}.`,
    rating: 0,
    numReviews: 0,
    price: Math.floor(Math.random() * 5000) + 500,
    countInStock: Math.floor(Math.random() * 50) + 10
  };
});

export { categories, products };
