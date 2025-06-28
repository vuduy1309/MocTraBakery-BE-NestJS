// Script này giúp bạn cập nhật dữ liệu mẫu cho MongoDB, đảm bảo liên kết đúng giữa products, categories, discounts.
// Chạy script này bằng node hoặc copy từng phần vào MongoDB shell/Compass.

const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'MocTraBakery';

async function seed() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  // Xóa dữ liệu cũ
  await db.collection('categories').deleteMany({});
  await db.collection('discounts').deleteMany({});
  await db.collection('products').deleteMany({});

  // Thêm categories
  const categories = [
    { name: 'Bánh Kem', description: 'Các loại bánh kem tươi ngon', image: 'https://example.com/images/banhkem.jpg' },
    { name: 'Bánh Mì', description: 'Bánh mì truyền thống', image: 'https://example.com/images/banhmi.jpg' },
    { name: 'Bánh Ngọt', description: 'Bánh su kem, cupcake, muffin', image: 'https://example.com/images/banhngot.jpg' },
  ];
  const catResult = await db.collection('categories').insertMany(categories);

  // Thêm discounts
  const discounts = [
    { name: 'Giảm 10% cho đơn hàng đầu tiên', percent: 10, description: 'Áp dụng cho khách hàng mới', active: true },
    { name: 'Mua 2 tặng 1', percent: 33, description: 'Áp dụng cho bánh mì và bánh ngọt', active: true },
  ];
  const disResult = await db.collection('discounts').insertMany(discounts);

  // Thêm products, liên kết đúng categoryId và discountId
  const products = [
    {
      name: 'Bánh Tart Dâu',
      description: 'Tart giòn nhân dâu ngọt nhẹ',
      price: 40000,
      images: ['https://example.com/images/tartdau.jpg'],
      stock: 15,
      isActive: true,
      categoryId: catResult.insertedIds['0'],
      discountId: disResult.insertedIds['0'],
      createdBy: new ObjectId(),
      createdAt: new Date(),
      isVegetarian: true,
    },
    {
      name: 'Cookie Socola Chip',
      description: 'Cookie mềm tan vị socola chip',
      price: 35000,
      images: ['https://example.com/images/cookie.jpg'],
      stock: 61,
      isActive: true,
      categoryId: catResult.insertedIds['2'],
      discountId: disResult.insertedIds['1'],
      createdBy: new ObjectId(),
      createdAt: new Date(),
      shelfLifeDays: 10,
    },
    {
      name: 'Flan Caramel',
      description: 'Bánh flan trứng mềm mịn phủ caramel',
      price: 25000,
      images: ['https://example.com/images/flan.jpg'],
      stock: 21,
      isActive: true,
      categoryId: catResult.insertedIds['0'],
      createdBy: new ObjectId(),
      createdAt: new Date(),
      isRefrigerated: true,
      isGlutenFree: true,
    },
  ];
  await db.collection('products').insertMany(products);

  console.log('Seed thành công!');
  await client.close();
}

seed();
