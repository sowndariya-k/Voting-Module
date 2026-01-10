// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuTGZNPixbNBm3SlTF4gzq8i2oiWXRqFs",
  authDomain: "scan-chain.firebaseapp.com",
  projectId: "scan-chain",
  storageBucket: "scan-chain.firebasestorage.app",
  messagingSenderId: "1066253647110",
  appId: "1:1066253647110:web:dcc58a2a898cf1fbf07287",
  measurementId: "G-NJRKZS9J14",

  // Realtime Database (NEW project)
  databaseURL: "https://scan-chain-default-rtdb.asia-southeast1.firebasedatabase.app"
};


// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    // Make database globally accessible
    window.database = firebase.database();
    
    // Enable offline persistence to handle network issues
    window.database.goOnline();
    
    // Log successful connection
    console.log("Firebase connection established");
} catch (error) {
    console.error("Firebase initialization error:", error);
    document.getElementById('status').textContent = 'Error: Failed to connect to database';
} 