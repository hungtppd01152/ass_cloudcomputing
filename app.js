var mysql = require("mysql");
var express = require("express");
var http = require("http");
var app = express();
var bodyParser = require('body-parser');

// Declare information about server & database
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "ass_cloudcomputingdb"
});

// Connect to database
con.connect(function(err){
	if(err){
		console.log("Error when connect to database.");
		return;
	}
	console.log("Connection to database successfully.");
});

// Configuration for express module
app.set("port", process.env.PORT || 1987);
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({
	extended: true }
));

// Create server express and listen on port 1987
http.createServer(app).listen(app.get("port"), function(){
	console.log("Server express is running on port %s ", app.get("port"));
});


//Router handler
app.get("/", function(req, res){
	res.sendFile(__dirname+ "/index.html");
});

app.post('/addcate', function (req, res) {
	con.query('INSERT INTO category_tb SET ?', req.body, 
        function (err, result) {
            if (err) throw err;
            res.send('Category added to database with ID: ' + result.insertId);
        }
    );
});

app.post('/addpro', function (req, res) {
	con.query('INSERT INTO product_tb SET ?', req.body, 
        function (err, result) {
            if (err){
            	res.send("Error when insert data to table")
            }
            res.send('Product added to database with ID: ' + result.insertId);
        }
    );
});

app.post("/addcus", function(req, res){
	con.query("INSERT INTO customer_tb SET ?", req.body, function(err, result){
		if(err) throw err;
		res.send("Customer added to database with ID: " + result.insertId);
	});
});

app.post("/addinvoice", function(req, res){
	con.query("INSERT INTO invoice_tb SET ?", req.body, function(err, result){
		if(err) throw err;
		res.send("" +result.insertId);
	});
});

app.post("/addinvoicedetail", function(req, res){
	con.query("INSERT INTO invoiceDetail_tb SET ?", req.body, function(err, result){
		if(err) throw err;
		res.send("Transaction added to database with ID: " + result.insertId);
	});
});

app.post("/showcate", function(req, res){
	con.query("SELECT * FROM category_tb", function(err, rows){
		if(!err){
			var str = "<table border='1' width='20%'>" +
					  "<tr><th>ID</th><th>Name</th></tr>";
			for(var i=0; i<rows.length; i++){
				str += "<tr><td>"+rows[i].id_cate+"</td><td>" +rows[i].name_cate+ "</td></tr>"; 
			}
			str+= "</table>"
			res.send(str);
		}else{
			res.send("Error when read table category")
		}
	});
});

app.post("/showcate_dropdown", function(req, res){
	con.query("SELECT * FROM category_tb", function(err, rows){
		if(!err){
			var str = "<select id='listCate'>";
			for(var i=0; i<rows.length; i++){
				str += "<option value='"+rows[i].id_cate+"'>" +rows[i].name_cate+ "</option>"; 
			}
			str+= "</select>"
			res.send(str);
		}else{
			res.send("Error when read table category")
		}
	});
});

app.post("/showpro", function(req, res){
	con.query("SELECT id_pro, name_pro, name_cate, desc_pro, price_pro" +
			" FROM product_tb" +
			" INNER JOIN category_tb on category_tb.id_cate = product_tb.id_cate ", function(err, rows){
		if(!err){
			var str = "<table id='tblPro' border='1'>" +
					  "<tr><th>Name</th><th>Category</th><th>Description</th><th>Price</th></tr>";
			for(var i=0; i<rows.length; i++){
				str+= "<tr><td>"+rows[i].name_pro+ "</td><td>" +rows[i].name_cate+ "</td><td>" +rows[i].desc_pro+ "</td><td>" +rows[i].price_pro+ "</td><td id='" +rows[i].id_pro+ "' class='del'><span class='ui-icon ui-icon-trash'></span></td></tr>";
			}
			str+= "</table>";
			res.send(str);
		}else{
			res.send("Error when read table product")
		}
	});
});

app.post("/showpro_dropdown", function(req, res){
	con.query("SELECT * FROM product_tb", function(err, rows){
		if(!err){
			var str = "<select id='listPro'>";
			for(var i=0; i<rows.length; i++){
				str+= "<option value='"+rows[i].id_pro+"'>" +rows[i].name_pro+ "</option>";
			}
			str+= "</select>";
			res.send(str);
		}else{
			res.send("Error when read table product")
		}
	});
});

app.post("/showcus", function(req, res){
	con.query("SELECT * FROM customer_tb", function(err, rows){
		if(!err){
			var str = "<table border='1'>" +
					  "<tr><th>Name</th><th>Address</th><th>Phone</th><th>Email</th></tr>";
			for(var i=0; i<rows.length; i++){
				str+= "<tr><td>"+rows[i].name_cus+ "</td><td>" +rows[i].address_cus+ "</td><td>" +rows[i].phone_cus+ "</td><td>" +rows[i].email_cus+ "</td></tr>";
			}
			str+= "</table>";
			res.send(str);
		}else{
			res.send("Error when read table customer")
		}
	});
});

app.post("/showcus_dropdown", function(req, res){
	con.query("SELECT * FROM customer_tb", function(err, rows){
		if(!err){
			var str = "<select id='listCus'>";
			for(var i=0; i<rows.length; i++){
				str+= "<option value='"+rows[i].id_cus+"'>" +rows[i].name_cus+ "</option>";
			}
			str+= "</select>";
			res.send(str);
		}else{
			res.send("Error when read table customer")
		}
	});
});

app.post("/showtrans", function(req, res){
	con.query("SELECT invoice_tb.id_invoice, date_invoice, name_cus, name_pro, quantity" +
			"  FROM invoice_tb" +
			" INNER JOIN customer_tb ON customer_tb.id_cus = invoice_tb.id_cus" +
			" INNER JOIN (invoicedetail_tb INNER JOIN product_tb ON invoicedetail_tb.id_pro = product_tb.id_pro)" +
			" ON invoicedetail_tb.id_invoice = invoice_tb.id_invoice" +
			" ORDER BY name_cus", function(err, rows){
		if(!err){
			var str = "<table border='1'>" +
					  "<tr><th>Invoice's ID</th><th>Date</th><th>Customer</th><th>Product</th><th>Quantity</th></tr>";
			for(var i=0; i<rows.length; i++){
				str+= "<tr><td>" +rows[i].id_invoice+ "</td><td>" +rows[i].date_invoice+ "</td><td>" +rows[i].name_cus+ "</td><td>" +rows[i].name_pro+ "</td><td>" +rows[i].quantity+ "</td></tr>" ;
			}
			str+= "</table>";
			res.send(str);
		}else{
			res.send("Error when read transaction from database");
		}
	});
});

app.post("/deletePro", function(req, res){
	con.query("delete from product_tb where id_pro = ?", [req.body], function(err, result){
		if(!err){
			res.send(result.affectedRows+ " row(s) deleted");
		}else{
			res.send("Error when delete product");
		}
	});
});