import { collection, count, getAggregateFromServer } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";

const Aside = () => {
  const [data, setData] = useState(0);
  const tweetsCol = collection(db, "tweets");
  // dökümanlar ile alakalı istatsilik hesaplamaya yarayan
  //1 kolleksiyonun refaransı
  //2 sum/avarage/count
  useEffect(() => {
    getAggregateFromServer(tweetsCol, { tweetsCount: count() }).then((res) =>
      setData(res.data())
    );
  }, []);
  return (
    <div className="max-lg:hidden">
      <h2 className="text-white ">
        Toplam Gönderi Sayısı : {data.tweetsCount}
      </h2>
    </div>
  );
};

export default Aside;
