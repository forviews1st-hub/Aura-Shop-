// api/login.js
export default async function handler(req, res) {
  // Sirf POST request allow karein
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Password ko body se nikalein
  const { password } = req.body;

  // Vercel Environment Variable se password compare karein
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Agar Vercel Dashboard mein password set nahi kiya toh error do
  if (!adminPassword) {
    console.error('❌ ADMIN_PASSWORD environment variable is not set!');
    return res.status(500).json({ success: false, message: 'Server configuration error.' });
  }

  // Password match kiya?
  if (password === adminPassword) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid password' });
  }
}