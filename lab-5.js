const students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
  ];





// Require the Fastify framework and instantiate it
const fastify = require("fastify")();
// Handle GET verb for / route using Fastify
// Note use of "chain" dot notation syntax
fastify.get("/cit/student", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});
//student id route
fastify.get("/cit/student/:id", (request, reply) => {
    let studentIDFromClient = request.params.id;
   
   let studentToSendToClient = null;
   for (studentInArray of students){
       if (studentInArray.id == studentIDFromClient) {
           studentToSendToClient = studentInArray;
           break;
       }
   }
    if (studentToSendToClient != null){
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(studentToSendToClient);
    }
    else{
        reply
        .code(404)
        .header("Content-Type", "text/html; charset=utf-8")
        .send("Could not find student with given id.")
    }
  });

  //student id route
fastify.get("*", (request, reply) => {
   
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(`<h1>unmatched route</h1>`);
  });


  fastify.get("/cit/student/add", (request, reply) => {
    let dataFromClient = JSON.parse(request.body);
    console.log(dataFromClient)
    let maxID = 0;
   for (individualStudent of students) {
       if (maxID < individualStudent.id) {
           maxID = individualStudent.id;
       }
   }
   

   let generatedStudent = {
        id: maxID + 1,
        first: dataFromClient.fname,
        last: dataFromClient.lname
      };
   students.push(generatedStudent)
   
    
   
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(generatedStudent);
  });
// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});



