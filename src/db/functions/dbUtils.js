import { db } from "../firebase/FirebaseConfig";

export const add = async (data, redirect) => {
    await db.collection("grandfather-project").add({
        student:{ 
            DNI: parseInt(data.DNI),
            name: data.name,
            surname: data.surname
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

export const search =  (data) => {
    return new Promise( async (resolve, reject) => {
        console.log(data)
        // XA 
        // 0 si no existe un alumno 
        // 1 si sí existe
        let XA
        await  db.collection("grandfather-project").where("student.DNI", "==", data)
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