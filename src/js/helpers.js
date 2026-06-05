import { async } from "regenerator-runtime";
import { TIME_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAXREQ = async function (URL, UploadData = undefined) {
  try {
    const fetchP = UploadData
      ? fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(UploadData),
        })
      : fetch(URL);

    const res = await Promise.race([fetchP, timeout(TIME_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}, (${res.status})`);
    return data;
  } catch (err) {
    // console.log(err);
    throw err;
  }
};

// export const getJSON = async function (URL) {
//   try {
//     const fetchP = fetch(URL);
//     const res = await Promise.race([fetchP, timeout(TIME_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}, (${res.status})`);
//     return data;
//   } catch (err) {
//     // console.log(err);
//     throw err;
//   }
// };

// export const sendJSON = async function (URL, UploadData) {
//   try {
//     const fetchP = fetch(URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },

//       body: JSON.stringify(UploadData),
//     });
//     const res = await Promise.race([fetchP, timeout(TIME_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}, (${res.status})`);
//     return data;
//   } catch (err) {
//     // console.log(err);
//     throw err;
//   }
// };
