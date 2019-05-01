import React, { useEffect } from "react";

const DEV = "Dev";
const PO = "Project Owner";

export const AtIndexedDB = () => {
  function isIdbOK() {
    return "indexedDB" in window &&
      !/iPad|iPhone|iPod/.test(navigator.platform);
  }

  let db: IDBDatabase;

  useEffect(() => {
    if (!isIdbOK()) {
      return;
    }

    const openRequest = indexedDB.open("demo01", 1);
    openRequest.onupgradeneeded = (ev: Event) => {
      console.log("szw onUpgradeNeeded");
      db = (ev.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(DEV)) {
        db.createObjectStore(DEV, {keyPath: "devID", autoIncrement: true});
      }
      if (!db.objectStoreNames.contains(PO)) {
        db.createObjectStore(PO, {autoIncrement: true});
      }
    };

    openRequest.onsuccess = (ev: Event) => {
      console.log("szw onSuccess");
      db = (ev.target as IDBOpenDBRequest).result;
      console.dir(db.objectStoreNames);
    };

    openRequest.onerror = (err) => {
      console.dir(err); //console.dir() 在控制台中显示指定JavaScript对象的属性，并通过类似文件树样式的交互列表显示。
    };

  }, []);

  return (
    <div>
      <p>idb</p>
    </div>);
};
