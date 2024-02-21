const http = require('http');

const server = http.createServer(function (req, res) {
  // check if is post
  if (req.method === "POST") {
    if (req.headers["access-control-request-method"]) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST");
      res.end();
    } else {
      let query = "";
      req.on("data", function(chunk) {
        query += chunk;
      });
      req.on("end", function() {
        let params = new URLSearchParams(query);
        let name = params.get("name");
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.write("Hello " + name);
        res.end(); 
      });
    }
  }
});

// listen on port 3000
server.listen(3000, function() {
  console.log("Running on port 3000");
});
