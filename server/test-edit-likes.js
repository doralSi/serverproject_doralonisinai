// Test editing and likes functionality
import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

async function testEditAndLikes() {
  console.log('🧪 Testing Edit and Likes functionality...\n');
  
  try {
    // Login as test user
    console.log('1️⃣ Logging in as test user...');
    const loginResponse = await axios.post(`${API_BASE}/users/login`, {
      email: "test@test.com",
      password: "Test123!"
    });
    const token = loginResponse.data;
    console.log('✅ Login successful');
    
    // Get user cards
    console.log('\n2️⃣ Getting user cards...');
    const cardsResponse = await axios.get(`${API_BASE}/cards`, {
      headers: { 'x-auth-token': token }
    });
    
    // Find a card created by this user
    const userCards = cardsResponse.data.filter(card => 
      card.user_id === '68fa90d6b3d7b683f7322af5' // Test user ID from earlier
    );
    
    if (userCards.length === 0) {
      console.log('❌ No user cards found');
      return;
    }
    
    const testCard = userCards[0];
    console.log(`✅ Found user card: ${testCard.title} (ID: ${testCard._id})`);
    
    // Test editing
    console.log('\n3️⃣ Testing card edit...');
    const updatedData = {
      title: testCard.title + " - EDITED",
      subtitle: testCard.subtitle,
      description: testCard.description + " (Updated)",
      phone: testCard.phone,
      email: testCard.email,
      web: testCard.web,
      image: testCard.image,
      address: testCard.address
    };
    
    const editResponse = await axios.put(`${API_BASE}/cards/${testCard._id}`, updatedData, {
      headers: { 'x-auth-token': token }
    });
    console.log('✅ Card edited successfully:', editResponse.data.title);
    
    // Test liking the card
    console.log('\n4️⃣ Testing card like...');
    const likeResponse = await axios.patch(`${API_BASE}/cards/${testCard._id}`, {}, {
      headers: { 'x-auth-token': token }
    });
    console.log('✅ Like toggled successfully, likes count:', likeResponse.data.likes.length);
    
    // Test unliking the card
    console.log('\n5️⃣ Testing card unlike...');
    const unlikeResponse = await axios.patch(`${API_BASE}/cards/${testCard._id}`, {}, {
      headers: { 'x-auth-token': token }
    });
    console.log('✅ Unlike toggled successfully, likes count:', unlikeResponse.data.likes.length);
    
    console.log('\n🎉 All edit and like tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    }
  }
}

testEditAndLikes();