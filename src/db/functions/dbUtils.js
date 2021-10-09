import { db } from "../firebase/FirebaseConfig";

export const add = async (data) => {
    await db.collection("grandfather-project").add({
        student:{ 
            DNI: parseInt(data.DNI),
            name: data.name,
            surname: data.surname
        }
    })
    .then(function() {
        console.log("Document written");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export const search =  (data) => {
    return new Promise( async (resolve, reject) => {
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
            if(XA)  {
                XA = 1
            }  else {
                XA = 0
            }
            return resolve(XA)
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
            return reject(error)
        });
    })
}           