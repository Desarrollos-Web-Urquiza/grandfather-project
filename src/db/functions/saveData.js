const {db} = require("../firebase/FirebaseConfigForNode")

//creates a new student or a new tutor
const add = async (type, data, redirect) => {
    if(type === "student"){
        await db.collection("grandfather-project").add({
            student:{ 
                DNI: parseInt(data.DNI),
                name: data.name,
                surname: data.surname,
                course: data.course,
                location: data.location,
                birthday: data.birthday,
                domicile: data.domicile,
                telephone: data.telephone,
                tutor: data.DNItutor
            }
        })
        .then(function() {
            console.log("Document written");
            redirect.push('/')
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
    if(type === "tutor"){
        await db.collection("grandfather-project").add({
            tutor:{ 
                DNI: parseInt(data.DNItutor),
                surname: data.surnameTutor,
                name: data.nameTutor,
                studentInCharge: [data.DNI]
            }
        })
        .then(function() {
            console.log("Document written");
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
}

const update = async (data) => {
    console.log("data.DNItutor", data.DNItutor)
    let dataOfPerson =  await search("tutor", data.DNItutor)
    console.log("dataOfPerson", dataOfPerson)
    console.log( dataOfPerson.data.tutor.studentInCharge)
    console.log( dataOfPerson.data.tutor)
    dataOfPerson.data.tutor.studentInCharge.push(data.DNI)
    let newStudentInCharge = dataOfPerson.data.tutor.studentInCharge
    console.log( newStudentInCharge)
    await db.collection("grandfather-project").doc(dataOfPerson.doc.id).update({         
        tutor: { 
            DNI: dataOfPerson.data.tutor.DNI,
            name: dataOfPerson.data.tutor.name,
            studentInCharge: newStudentInCharge,
            surname: dataOfPerson.data.tutor.surname
        }
    })
    .then(function() {      
        console.log("updated");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}

const search =  (type, DNI) => {
    return new Promise( async (resolve, reject) => {
        // XA 
        // 0 si no existe
        // 1 si sí existe
        let XA
        let document
        type = type + ".DNI"
        console.log(type)
        console.log("DNI search", DNI)
        await  db.collection("grandfather-project").where(type, "==", parseInt(DNI))
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                XA = doc.data()
                document = doc
            });
            console.log(XA)
            if(XA)  {
                XA = 1
            }  else {
                XA = 0
            }
            console.log(XA)
            if(type.includes("tutor") && XA === 1){
                console.log(document)
                return resolve({exitence: XA, data: document.data(), doc: document})
            }   else{
                return resolve(XA)
            }
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
            return reject(error)
        });
    })
}    

const saveData = async () => {
    for (let index = 0 ; index < 2 ; index++) {
        let data = {
            DNI: "12345678",
            DNItutor: "2342423",
            birthday: "2007-04-03",
            course: "1-1",
            domicile: "Cullen 777",
            location: "Rosario",
            name: "Juan",
            nameTutor: "Alberto",
            surname: "Perez",
            surnameTutor: "Perez",
            telephone: "4342434"
        }
        add("student", data, "")
        let existsTutor = await search("tutor", data.DNItutor)
        console.log(existsTutor)
    
        if(existsTutor.exitence === 0){
            add("tutor", data)
        }	else{
            existsTutor = ""
            update(data)
        }
    }
}

saveData()