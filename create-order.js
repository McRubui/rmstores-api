export default async function handler(req, res) {

const PRINTIFY_API_KEY = "YOUR_PRINTIFY_API_KEY";
const SHOP_ID = "YOUR_SHOP_ID";

const {cart, shipping} = req.body;

const order = {

line_items: cart.map(item => ({
product_id: item.printify_product_id,
variant_id: item.printify_variant_id,
quantity: 1
})),

shipping_method: 1,

send_shipping_notification: true,

address_to: {
first_name: shipping.name,
email: shipping.email,
address1: shipping.address1,
city: shipping.city,
country: shipping.country,
zip: shipping.zip
}

};

const response = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/orders.json`, {

method: "POST",

headers: {
"Authorization": `Bearer ${PRINTIFY_API_KEY}`,
"Content-Type": "application/json"
},

body: JSON.stringify(order)

});

const data = await response.json();

res.status(200).json(data);

}
