import { db } from "../firebase/FirebaseConfig";

//creates a new student or a new tutor
export const add = async (type, data, redirect) => {
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
                telephone: data.telephone
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

export const search =  (type, DNI) => {
    return new Promise( async (resolve, reject) => {
        // XA 
        // 0 si no existe
        // 1 si sí existe
        let XA
        await  db.collection("grandfather-project").where(type + ".DNI", "==", DNI)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                XA = doc.data()
            });
            console.log(XA)
            if(XA)  {
                XA = 1
            }  else {
                XA = 0
            }
            console.log(XA)
            return resolve(XA)
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
            return reject(error)
        });
    })
}           