// Test script to verify all endpoints work
import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

async function testAPI() {
  console.log('🧪 Testing BCards API...\n');
  
  try {
    // Test 1: Check server is running
    console.log('1️⃣ Testing server ping...');
    const pingResponse = await axios.get('http://localhost:3000/ping');
    console.log('✅ Server is running:', pingResponse.data);
    
    // Test 2: Get all cards (without auth)
    console.log('\n2️⃣ Testing GET /api/cards...');
    const cardsResponse = await axios.get(`${API_BASE}/cards`);
    console.log(`✅ Found ${cardsResponse.data.length} cards`);
    
    // Test 3: Register a new user
    console.log('\n3️⃣ Testing user registration...');
    const newUser = {
      name: {
        first: "Test",
        middle: "",
        last: "User"
      },
      phone: "050-1111111",
      email: "test@test.com",
      password: "Test123!",
      image: {
        url: "https://via.placeholder.com/150",
        alt: "Test user"
      },
      address: {
        state: "",
        country: "Israel", 
        city: "Test City",
        street: "Test Street",
        houseNumber: 1,
        zip: 12345
      },
      isBusiness: true
    };
    
    try {
      const registerResponse = await axios.post(`${API_BASE}/users`, newUser);
      console.log('✅ User registered successfully:', registerResponse.data);
    } catch (err) {
      if (err.response?.status === 400 && err.response?.data.includes('Email already exists')) {
        console.log('ℹ️ Test user already exists, continuing...');
      } else {
        throw err;
      }
    }
    
    // Test 4: Login
    console.log('\n4️⃣ Testing login...');
    const loginResponse = await axios.post(`${API_BASE}/users/login`, {
      email: "test@test.com",
      password: "Test123!"
    });
    const token = loginResponse.data;
    console.log('✅ Login successful, got token');
    
    // Test 5: Create a card
    console.log('\n5️⃣ Testing card creation...');
    const newCard = {
      title: "Test Business",
      subtitle: "Test Subtitle", 
      description: "Test description",
      phone: "050-1234567",
      email: "info@testbusiness.com",
      web: "https://www.testbusiness.com",
      image: {
        url: "https://via.placeholder.com/400x200?text=Test+Business",
        alt: "Test business image"
      },
      address: {
        state: "",
        country: "Israel",
        city: "Test City",
        street: "Test Street", 
        houseNumber: 123,
        zip: 0
      }
    };
    
    const createResponse = await axios.post(`${API_BASE}/cards`, newCard, {
      headers: { 'x-auth-token': token }
    });
    console.log('✅ Card created successfully:', createResponse.data.title);
    const cardId = createResponse.data._id;
    
    // Test 6: Toggle like
    console.log('\n6️⃣ Testing card like...');
    const likeResponse = await axios.patch(`${API_BASE}/cards/${cardId}`, {}, {
      headers: { 'x-auth-token': token }
    });
    console.log('✅ Like toggled successfully, likes count:', likeResponse.data.likes.length);
    
    console.log('\n🎉 All tests passed! Your API is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testAPI();