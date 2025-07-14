// seed.js
dotenv.config(); // Load env variables
import dotenv from "dotenv";

import mongoose from 'mongoose';
import { categories, products } from './data/seedData.js';
import Category from './models/CategoryModel.js';
import Product from './models/ProductModel.js';

console.log("📦 Seeding started...");
console.log("MongoDB URI ➜", process.env.MONGODB_URI); // ✅ Debug log

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected!");

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("🧹 Old data removed.");

    // Insert categories
    const insertedCategories = await Category.insertMany(categories);
    console.log(`📁 ${insertedCategories.length} categories inserted.`);

    // Map category names to their new _id values
    const categoryMap = {};
    insertedCategories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    // Attach category IDs to products
    const updatedProducts = products.map(prod => ({
      ...prod,
      category: categoryMap[prod.category] || null
    }));

    // Insert products
    await Product.insertMany(updatedProducts);
    console.log(`🛍️ ${updatedProducts.length} products inserted.`);

    console.log("✅ Database seeding completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedDB();
