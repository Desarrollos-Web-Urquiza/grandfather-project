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