const express = require("express");
const app = express();
const users = require("./routes/usersRoute");
const login = require("./routes/loginRoute");
const settings = require("./routes/settingRoute");
const mongoose = require("mongoose");
const path = require("path");
const port = process.env.PORT;

app.use(express.json({ limit: "100kb" }));

app.use("/users", users);
app.use("/login", login);
app.use("/settings", settings);

mongoose
	.connect(process.env.DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("DB connected");
	})
	.catch((err) => {
		console.log(`DB Error ${err}`);
	});

app.use(express.static("dashboard/build"));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, (err) => {
	if (err) console.log(err);
	else console.log(`listening on port ${port}`);
});