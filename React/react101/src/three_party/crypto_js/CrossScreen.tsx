import React, { useState } from "react";
import CryptoJS, { LibWordArray, WordArray } from "crypto-js";
import Base64 from "crypto-js/enc-base64";
import Utf8 from "crypto-js/enc-utf8";
import SHA256 from "crypto-js/sha256";
import AES from "crypto-js/aes";
import Pkcs7 from "crypto-js/pad-pkcs7";
import Hex from "crypto-js/enc-hex";
import ECB from "crypto-js/mode-ecb";
import { did, kid, uid } from "../../biz/adrm/ids";
import { byteArrayToWordArray, wordArrayToByteArray } from "../../biz/adrm/CryptoUtils";

/*
java平台: AES/ECB/NoPadding
  String src = "[easy plaintext]";
  String key = "0123456789abcdef";
  密文: nSA0RU/u2r9dyd5mopht0g==
 */

interface IProps {
}

export const CrossScreen = (props: IProps) => {
  const [result, setResult] = useState("...");

  function onClickDecryptoJava() {
    const encrypted = "nSA0RU/u2r9dyd5mopht0g==";
    const key = Utf8.parse("0123456789abcdef");

    // 关键1: decrypt()第一参得是个base64
    // 关键2: decrypt()第二参得是个Utf8.parse()
    const rawDecrypted = AES.decrypt(encrypted, key, { mode: ECB, padding: CryptoJS.pad.ZeroPadding });
    const decrypted = rawDecrypted.toString(Utf8);
    setResult(decrypted);
  }

  function onClickDes() {
    // @ts-ignore
    const sha256 = SHA256(did + uid) as LibWordArray;
    const k1 = sha256.toString().substr(length - 32);
    console.log(`szw 01, `, k1);

    const rawD1 = Base64.parse(kid);
    console.log(`szw 02, `, rawD1.toString());

    const mykey = AES.decrypt(kid, Utf8.parse(k1), { mode: ECB, padding: CryptoJS.pad.NoPadding });
    console.log(`szw 03, `, mykey);
  }

  return (
    <div>
      <p>{result}</p>
      <button onClick={onClickDecryptoJava}>Decrypt words from Java</button>
      <button onClick={onClickDes}>description</button>
    </div>
  );
};