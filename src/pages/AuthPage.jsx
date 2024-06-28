import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { auth, provider } from "./../firebase/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthPage = () => {
  const [isSingUp, setIsSingUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [forgetPassword, setForgetPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSingUp) {
      // eger kaydol modundaysa
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info("Hesabınız oluşturuldu");
          navigate("/home");
        })
        .catch((err) => toast.error(err.code));
    } else {
      //eger giriş yapma modundaysa
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info("Hesabınıza giriş yapıldı");
          navigate("/home");
        })
        .catch((err) => {
          if (err.code === "auth/invalid-credential") {
            toast.error(`Üzgünüz bir hata oluştu: ${err.code}`);
            setForgetPassword(true);
          }
        });
    }
  };
  const sendMail = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      toast.info("Epostanıza  şifre sıfırlama isteği gönderildi");
    });
  };
  // google hesabı ile oturum açma
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => navigate("/home"))
      .catch((err) => console.log(err));
  };
  return (
    <section className="h-screen grid place-items-center ">
      <div className="bg-black  flex flex-col  gap-10 py-16 px-32 rounded-lg ">
        <div className="flex justify-center">
          <img className="h-[60px] " src="/x-logo.webp" alt="" />
        </div>
        <h1 className="text-center font-bold text-xl">Twitter'a Giriş Yap</h1>
        <button
          onClick={loginWithGoogle}
          className="flex  items-center gap-3 bg-white rounded-full px-10 py-2 text-black transition hover:bg-gray-400 "
        >
          <img className="h-[20px]" src="./google-logo.svg" alt="" />
          <span className="text-nowrap">Google ile Giriş Yap</span>
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label  htmlFor="">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none "
            type="text"
            required
          />
          <label className="mt-5" htmlFor="">
            Şifre
          </label>
          <input
            onChange={(e) => setPass(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none "
            type="password"
            required
          />
          <button className="mt-10 bg-white  text-black rounded-full p-1 font-bold transition hover:bg-gray-300">
            {isSingUp ? "Kaydol" : "Giriş Yap"}
          </button>
          <p className="mt-5 flex gap-3">
            <span className="text-gray-500">
              {isSingUp ? "Hesabınız Varsa " : "Hesabınız Yoksa"}
            </span>
            <span
              onClick={() => setIsSingUp(!isSingUp)}
              className="text-blue-500 cursor-pointer"
            >
              {isSingUp ? "Giriş Yapın" : "Kaydolun"}
            </span>
          </p>
        </form>
        {forgetPassword && (
          <p
            onClick={sendMail}
            className="text-rose-500 text-center cursor-pointer"
          >
            Şifrenizi mi unuttunuz ?
          </p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
