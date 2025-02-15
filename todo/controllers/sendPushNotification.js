const fetch = require("node-fetch");

const sendPushNotification = async (expoPushToken, title, message) => {
  const messagePayload = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: message,
    data: { screen: "DetailTugas" }, // Bisa navigasi ke halaman tertentu
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messagePayload),
  });

  console.log("Notifikasi terkirim ke:", expoPushToken);
};

// Contoh penggunaan:
sendPushNotification("ExponentPushToken[example123]", "Pengingat Deadline!", "Jangan lupa selesaikan tugasmu.");
