const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Menu = require('../models/Menu');
const Content = require('../models/Content');
const Customer = require('../models/Customer');
const Admin = require('../models/Admin');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Menu.deleteMany({});
    await Content.deleteMany({});
    await Customer.deleteMany({});
    await Admin.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      username: 'admin',
      email: 'admin@spicehut.com',
      password: hashedPassword,
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1 (555) 123-4567'
    });
    await adminUser.save();

    // Create admin profile
    const adminProfile = new Admin({
      user: adminUser._id,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@spicehut.com',
      phone: '+1 (555) 123-4567',
      role: 'Super Admin',
      permissions: {
        menuManagement: true,
        orderManagement: true,
        customerManagement: true,
        adminManagement: true,
        reports: true,
        contentManagement: true
      }
    });
    await adminProfile.save();

    // Create test customer user
    const customerPassword = await bcrypt.hash('customer123', 10);
    const customerUser = new User({
      username: 'customer1',
      email: 'customer@spicehut.com',
      password: customerPassword,
      role: 'user',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 (555) 987-6543'
    });
    await customerUser.save();

    // Create customer profile
    const customerProfile = new Customer({
      user: customerUser._id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'customer@spicehut.com',
      phone: '+1 (555) 987-6543',
      addresses: [{
        label: 'Home',
        street: '123 Main Street',
        city: 'Toronto',
        state: 'ON',
        zipCode: 'M5V 3A8',
        country: 'Canada',
        isDefault: true
      }],
      preferences: {
        dietaryRestrictions: ['Vegetarian'],
        spiceLevel: 'Medium'
      },
      loyaltyPoints: 150
    });
    await customerProfile.save();

    // Create menu items
    const menuItems = [
      // Appetizers
      {
        name: 'Papadums (2 pcs)',
        category: 'Appetizers',
        price: 5.95,
        description: 'Crispy lentil wafers served with mint chutney',
        tags: ['LF'],
        preparationTime: 5
      },
      {
        name: 'Veggie Pakora',
        category: 'Appetizers',
        price: 9.95,
        description: 'Mixed vegetables dipped in spiced chickpea batter and deep-fried',
        tags: ['LF', 'VEG'],
        preparationTime: 10
      },
      {
        name: 'Chicken Pakora',
        category: 'Appetizers',
        price: 13.95,
        description: 'Tender chicken pieces marinated in spices and deep-fried',
        tags: ['LF'],
        preparationTime: 12
      },

      // Butter Dishes
      {
        name: 'Butter Chicken',
        category: 'Butter Dishes',
        price: 19.95,
        description: 'Tender chicken in a rich tomato and butter sauce',
        tags: ['GF'],
        preparationTime: 20
      },
      {
        name: 'Butter Beef',
        category: 'Butter Dishes',
        price: 21.95,
        description: 'Succulent beef in creamy tomato and butter sauce',
        tags: ['GF'],
        preparationTime: 25
      },

      // Tandoori Dishes
      {
        name: 'Tandoori Chicken Tikka (Boneless)',
        category: 'Tandoori Dishes',
        price: 21.95,
        description: 'Marinated chicken cooked in clay oven, served with rice and salad',
        tags: ['GF'],
        preparationTime: 30
      },
      {
        name: 'Tandoori Mixed Platter',
        category: 'Tandoori Dishes',
        price: 29.95,
        description: 'Includes Chicken Tikka, Malai Tikka, Beef Kebab & Prawn Tikka',
        tags: ['GF'],
        preparationTime: 35
      },

      // Biryani Dishes
      {
        name: 'Chicken Biryani',
        category: 'Biryani Dishes',
        price: 19.95,
        description: 'Fragrant basmati rice cooked with chicken and aromatic spices',
        tags: ['GF'],
        preparationTime: 25
      },
      {
        name: 'Vegetable Biryani',
        category: 'Biryani Dishes',
        price: 19.95,
        description: 'Fragrant basmati rice cooked with mixed vegetables and spices',
        tags: ['GF', 'VEG'],
        preparationTime: 20
      },

      // Indian Naan Bread
      {
        name: 'Garlic Naan',
        category: 'Indian Naan Bread',
        price: 4.95,
        description: 'Traditional naan bread topped with garlic and herbs',
        preparationTime: 8
      },
      {
        name: 'Chicken Keema Naan',
        category: 'Indian Naan Bread',
        price: 9.95,
        description: 'Naan stuffed with spiced chicken cooked in tandoor',
        preparationTime: 12
      },

      // Indian Desserts
      {
        name: 'Gulab Jamun',
        category: 'Indian Desserts',
        price: 7.95,
        description: 'Soft milk dumplings in sweet rose-flavored syrup',
        tags: ['VEG'],
        preparationTime: 5
      },
      {
        name: 'Kulfi',
        category: 'Indian Desserts',
        price: 7.95,
        description: 'Traditional Indian ice cream with cardamom and pistachios',
        tags: ['VEG'],
        preparationTime: 3
      }
    ];

    await Menu.insertMany(menuItems);
    console.log('Menu items created');

    // Create website content
    const contentData = [
      {
        page: 'About',
        title: 'About Spice Hut',
        content: 'Welcome to Spice Hut! We have been serving authentic Indian cuisine since 2010. Our mission is to provide exceptional dining experiences with fresh ingredients and outstanding service. We pride ourselves on our diverse menu that caters to all tastes and dietary preferences.',
        metaDescription: 'Learn about Spice Hut - authentic Indian restaurant serving delicious cuisine since 2010',
        contactInfo: {
          address: {
            street: '123 Culinary Street',
            city: 'Food District',
            state: 'ON',
            zipCode: 'M5V 3A8',
            country: 'Canada'
          },
          phone: '+1 (555) 123-4567',
          email: 'info@spicehut.com',
          hours: {
            monday: '11:00 AM - 10:00 PM',
            tuesday: '11:00 AM - 10:00 PM',
            wednesday: '11:00 AM - 10:00 PM',
            thursday: '11:00 AM - 10:00 PM',
            friday: '11:00 AM - 11:00 PM',
            saturday: '12:00 PM - 11:00 PM',
            sunday: '12:00 PM - 9:00 PM'
          }
        }
      },
      {
        page: 'Contact',
        title: 'Contact Us',
        content: 'Get in touch with us for reservations, catering, or any questions about our menu.',
        metaDescription: 'Contact Spice Hut for reservations, catering, or menu inquiries',
        contactInfo: {
          address: {
            street: '123 Culinary Street',
            city: 'Food District',
            state: 'ON',
            zipCode: 'M5V 3A8',
            country: 'Canada'
          },
          phone: '+1 (555) 123-4567',
          email: 'info@spicehut.com',
          hours: {
            monday: '11:00 AM - 10:00 PM',
            tuesday: '11:00 AM - 10:00 PM',
            wednesday: '11:00 AM - 10:00 PM',
            thursday: '11:00 AM - 10:00 PM',
            friday: '11:00 AM - 11:00 PM',
            saturday: '12:00 PM - 11:00 PM',
            sunday: '12:00 PM - 9:00 PM'
          }
        }
      },
      {
        page: 'Privacy Policy',
        title: 'Privacy Policy',
        content: 'We are committed to protecting your privacy. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.',
        metaDescription: 'Spice Hut privacy policy - how we protect your personal information'
      },
      {
        page: 'Terms of Service',
        title: 'Terms of Service',
        content: 'By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement.',
        metaDescription: 'Spice Hut terms of service and user agreement'
      },
      {
        page: 'Refund Policy',
        title: 'Refund Policy',
        content: 'We want you to be completely satisfied with your dining experience. If you are not satisfied with your order, please contact us within 24 hours for a full refund.',
        metaDescription: 'Spice Hut refund policy and satisfaction guarantee'
      }
    ];

    await Content.insertMany(contentData);
    console.log('Website content created');

    console.log('Database seeded successfully!');
    console.log('\nTest Accounts:');
    console.log('Admin: admin@spicehut.com / admin123');
    console.log('Customer: customer@spicehut.com / customer123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the seeder
if (require.main === module) {
  seedData();
}

module.exports = seedData;
