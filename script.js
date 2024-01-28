let inputText = document.getElementById("writeText");
const readButton = document.getElementById("readButton");
const readLog = document.getElementById("readLog");

readButton.addEventListener("click", async () => {
  readLog.textContent = await "clicked read button";
  try {
    const reader = new NDEFReader();
    await reader.scan();
    readLog.textContent = "scan started!";

    reader.addEventListener("error", () => {
      console.log("Error");
      let text = readLog.textContent;
      readLog.textContent = text + '<br>' + "Error";
    });

    reader.addEventListener("reading", ({ message, serialNumber }) => {
      console.log(`> Serial Number: ${serialNumber}`);
      let text = readLog.textContent;
      console.log(message);
      readLog.textContent = text + '<br>' + `> Serial Number: ${serialNumber}` + '<br>' + message;
      const record = message.records[0];
      const { data, encoding, recordType } = record;
      if (recordType === "text") {
        const textDecoder = new TextDecoder(encoding);
        const text = textDecoder.decode(data);
        readLog.textContent = text;
      }
    });
  } catch (error) {
    readLog.textContent = error;
  }
});
