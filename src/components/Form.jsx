import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  // tweets koleksiyonun refaransını alma
  const tweetsCol = collection(db, "tweets");

  // dosyayı eger resim ise resmi storage yükle

  // resmin url'nin fonksiyonun çağırıldığı yere döndür
  const uploadImage = async (file) => {
    // 1 dosya resim değilse fonksiyonu durdur
    // console.log(file);
    if (!file || !file.type.startsWith("image")) return null;

    // 2 dosya yükleneceği yerin referansını oluştur
    const fileRef = ref(storage, v4() + file.name);

    // 3 refaransı oluşturduğumuz yere dosyayı yükle
    await uploadBytes(fileRef, file);

    // 4 yüklenen dosyanın url'ine eriş
    return await getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    // yazı veya resimiçeriği yoksa uyarı ver
    if (!textContent && !imageContent)
      return toast.info("Lütfen içerik giriniz");
    setIsLoading(true);
    //resmi yükle
    const url = await uploadImage(imageContent);
    // tweet kolleksiyonuna yeni döküman ekle
    await addDoc(tweetsCol, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });
    setIsLoading(false);
    e.target.reset();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-[1px] border-gray-700"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px] mt-1"
        src={user?.photoURL}
        alt="profile-pic"
      />
      <div className=" w-full">
        <input
          type="text"
          placeholder="Neler Oluyor ?"
          className="w-full bg-transparent my-2 outline-none md:text-lg"
        />
        <div className="flex justify-between items-center">
          <label
            htmlFor="image-input"
            className="hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full"
          >
            <BsCardImage />
          </label>
          <input id="image-input" type="file" className="hidden" />
          <button className="bg-blue-500 flex items-center justify-center px-4 py-2 rounded-full min-w-[85px] min-h-[40px] transition hover:bg-blue-800 ">
            {isLoading ? <Spinner size={10} /> : "tweetle"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
