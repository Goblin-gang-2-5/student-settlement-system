const bcrypt = require("bcrypt");

bcrypt.hash("gbplf128", 12).then(d => console.log(d))