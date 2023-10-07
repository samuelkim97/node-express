const express = require("express");
const app = express();
const { products } = require("./data");

app.get("/", (req, res) => {
	res.send('<h1>home page</h1><a href="/api/products">products</a>');
});

// sending specific json file
app.get("/api/products", (req, res) => {
	const newProducts = products.map((product) => {
		const { id, name, image } = product;
		return { id, name, image };
	});
	res.json(newProducts);
});

// sending single object in json file
// route params
app.get("/api/products/:productID", (req, res) => {
	const { productID } = req.params;
	const singleProduct = products.find(
		(product) => product.id === Number(productID)
	);
	if (!singleProduct) {
		res.status(404).send("product does not exist");
	}
	res.json(singleProduct);
});

// query params
app.get("/api/v1/query", (req, res) => {
	console.log(req.query);

	let sortedProducts = [...products];
	const { search, limit } = req.query;

	if (search) {
		sortedProducts = sortedProducts.filter((product) =>
			product.name.startsWith(search)
		);
	}
	if (limit) {
		sortedProducts = sortedProducts.slice(0, Number(limit));
	}
	if (sortedProducts.length < 1) {
		// res.status(200).send("no products matched your search");
		return res.status(200).json({ success: true, data: [] });
	}
	res.status(200).json(sortedProducts);
});

app.listen(5000, () => {
	console.log("server is listening on port 5000...");
});
