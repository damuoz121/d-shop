const mongoose = require("mongoose");

const uri = "mongodb+srv://danielbd:danielbd@clusteradso2498009.ack5vdp.mongodb.net/danielstore";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
