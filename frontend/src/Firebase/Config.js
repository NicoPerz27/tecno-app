import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import Cookies from "universal-cookie";
import { v4 } from "uuid";

const cookies = new Cookies();
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjkq1YTOtsp7NAq-X3FXGG-K1Mkq48GLk",
  authDomain: "tecnopunto-app.firebaseapp.com",
  projectId: "tecnopunto-app",
  storageBucket: "tecnopunto-app.appspot.com",
  messagingSenderId: "1086338388619",
  appId: "1:1086338388619:web:32cf8a59bf3e481ae8ba8e",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export async function uploadFile(file) {
  const storageRef = ref(storage, v4()+file.name);
  await uploadBytes(storageRef, file);
  const urlFile = await getDownloadURL(storageRef);
  return urlFile;
}
/*export async function deleteFile(file){
  const storageRef = ref(storage, );
  await deleteObject(storageRef)
  console.log("File Deleted")
}*/
