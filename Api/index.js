let orders = [];
let riders = {};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if(req.method === 'OPTIONS') return res.status(200).end();

  const { type } = req.query;

  if(type === 'order' && req.method === 'POST'){
    const order = { id: Date.now().toString(), ...req.body, status: 'preparing' };
    orders.push(order);
    return res.json({ success: true, order });
  }

  if(type === 'vendor'){
    return res.json(orders);
  }

  if(type === 'update' && req.method === 'POST'){
    const { id, status } = req.body;
    let o = orders.find(x => x.id == id || x.phone == id);
    if(o) o.status = status;
    return res.json({ success: true });
  }

  if(type === 'rider-location' && req.method === 'POST'){
    const { riderId, lat, lng } = req.body;
    riders[riderId] = { lat, lng };
    return res.json({ success: true });
  }

  if(type === 'track'){
    const { id } = req.query;
    let order = orders.find(x => x.id == id || x.phone == id);
    let riderLoc = order ? riders[order.riderId] : null;
    return res.json({ order, riderLoc, riders });
  }

  return res.json({ msg: 'Akkel Backend شغال ✅', ordersCount: orders.length });
}
