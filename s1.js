var hapi=require('@hapi/hapi');
require("dotenv").config();
var mysql=require('mysql');

var server=new hapi.Server({
    host:'localhost',
    port:9000,
    routes : {
            cors : true
        }
});


server.route({
    method:"GET",
    path:"/api/movies",
    handler:(request,reply)=>{
      return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
              connection.query(`SELECT * from movies`, function (error,movies, fields) {
                if (error) reject(error);
                resolve(movies);
              }); 
              connection.end();
        })
      } 
});

server.route({
    method:"POST",
    path:"/api/theatres",
    handler:(request,reply)=>{
    	var id=request.payload;
      return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
              connection.query(`SELECT * from theatres where mid=${id}`, function (error,theatres, fields) {
                if (error) reject(error);
                resolve(theatres);
              });  
              connection.end();
        })   
    }
});


server.route({
  method:"POST",
  path:"/api/theatres1",
  handler:(request,reply)=>{
    var ttid=request.payload;
    console.log(ttid);
    return new Promise((resolve,reject)=>{
          var connection = mysql.createConnection({
              host     : process.env.DB_HOST,
              user     : process.env.DB_USER,
              password : process.env.DB_PASSWORD,
              database : process.env.DB_NAME
            });
            connection.connect();
            connection.query(`update theatres  set avl_seats=avl_seats - '${ttid.id1}' where tid= '${ttid.id2}'`, function (error,theatres, fields) {
              if (error) reject(error);
              resolve(theatres);
            });  
            connection.end();
      })   
  }
});


server.route({
  method:"POST",
  path:"/api/theatres2",
  handler:(request,reply)=>{
    var ttid=request.payload;
    console.log(ttid);
    return new Promise((resolve,reject)=>{
          var connection = mysql.createConnection({
              host     : process.env.DB_HOST,
              user     : process.env.DB_USER,
              password : process.env.DB_PASSWORD,
              database : process.env.DB_NAME
            });
            connection.connect();
            connection.query(`update theatres  set avl_seats=avl_seats + '${ttid.id1}' where tid= '${ttid.id2}'`, function (error,theatres, fields) {
              if (error) reject(error);
              resolve(theatres);
            });  
            connection.end();
      })   
  }
});



server.start((err)=>{
    if(err) throw err;
    
})
console.log("Server is started"+ server.info.uri)
