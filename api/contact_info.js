export default async function handler(req, res) {
  try {
    const resp = await fetch("https://ntquang.infinityfreeapp.com/api/contact_info");
    const data = await resp.json();

    // thêm CORS header để Vercel trả về cho frontend
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching API" });
  }
}
