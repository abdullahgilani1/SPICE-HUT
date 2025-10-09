// Test file for authentication endpoints
// Run with: node test/auth.test.js

const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/auth';

// Test data
const testUser = {
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'password123',
  firstName: 'Test',
  lastName: 'User',
  phone: '+1 (555) 123-4567'
};

const testAdmin = {
  username: 'testadmin',
  email: 'testadmin@example.com',
  password: 'password123',
  firstName: 'Test',
  lastName: 'Admin',
  phone: '+1 (555) 987-6543',
  adminRole: 'Manager',
  department: 'Kitchen'
};

async function testAuthEndpoints() {
  console.log('🧪 Testing Authentication Endpoints...\n');

  try {
    // Test 1: User Signup
    console.log('1. Testing User Signup...');
    const userSignupResponse = await axios.post(`${BASE_URL}/signup/user`, testUser);
    console.log('✅ User signup successful:', userSignupResponse.data.message);
    console.log('   User ID:', userSignupResponse.data.data.user.id);
    console.log('   Token received:', !!userSignupResponse.data.data.token);
    console.log('');

    // Test 2: Admin Signup
    console.log('2. Testing Admin Signup...');
    const adminSignupResponse = await axios.post(`${BASE_URL}/signup/admin`, testAdmin);
    console.log('✅ Admin signup successful:', adminSignupResponse.data.message);
    console.log('   Admin ID:', adminSignupResponse.data.data.user.id);
    console.log('   Admin Role:', adminSignupResponse.data.data.user.adminProfile.adminRole);
    console.log('   Token received:', !!adminSignupResponse.data.data.token);
    console.log('');

    // Test 3: User Login
    console.log('3. Testing User Login...');
    const userLoginResponse = await axios.post(`${BASE_URL}/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ User login successful:', userLoginResponse.data.message);
    console.log('   User Role:', userLoginResponse.data.data.user.role);
    console.log('   Loyalty Points:', userLoginResponse.data.data.user.loyaltyPoints);
    console.log('');

    // Test 4: Admin Login
    console.log('4. Testing Admin Login...');
    const adminLoginResponse = await axios.post(`${BASE_URL}/login`, {
      email: testAdmin.email,
      password: testAdmin.password
    });
    console.log('✅ Admin login successful:', adminLoginResponse.data.message);
    console.log('   Admin Role:', adminLoginResponse.data.data.user.role);
    console.log('   Admin Permissions:', Object.keys(adminLoginResponse.data.data.user.permissions));
    console.log('');

    // Test 5: Get User Profile
    console.log('5. Testing Get User Profile...');
    const userToken = userLoginResponse.data.data.token;
    const userProfileResponse = await axios.get(`${BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log('✅ User profile retrieved successfully');
    console.log('   Profile Name:', userProfileResponse.data.data.user.firstName, userProfileResponse.data.data.user.lastName);
    console.log('');

    // Test 6: Get Admin Profile
    console.log('6. Testing Get Admin Profile...');
    const adminToken = adminLoginResponse.data.data.token;
    const adminProfileResponse = await axios.get(`${BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('✅ Admin profile retrieved successfully');
    console.log('   Admin Name:', adminProfileResponse.data.data.user.firstName, adminProfileResponse.data.data.user.lastName);
    console.log('   Department:', adminProfileResponse.data.data.user.department);
    console.log('');

    // Test 7: Invalid Login
    console.log('7. Testing Invalid Login...');
    try {
      await axios.post(`${BASE_URL}/login`, {
        email: 'invalid@example.com',
        password: 'wrongpassword'
      });
    } catch (error) {
      console.log('✅ Invalid login properly rejected:', error.response.data.message);
    }
    console.log('');

    // Test 8: Duplicate User Signup
    console.log('8. Testing Duplicate User Signup...');
    try {
      await axios.post(`${BASE_URL}/signup/user`, testUser);
    } catch (error) {
      console.log('✅ Duplicate signup properly rejected:', error.response.data.message);
    }
    console.log('');

    console.log('🎉 All authentication tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAuthEndpoints();
}

module.exports = testAuthEndpoints;
