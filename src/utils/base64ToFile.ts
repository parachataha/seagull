

export default function base64ToFile(base64String : any, filename : string) {
    const [metadata, data] = base64String.split(',');
    const mimeType = metadata.match(/:(.*?);/)[1]; // Extract mime type (e.g., image/png)
    const binaryData = atob(data); // Decode base64 string into binary data
  
    // Create an array buffer
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
  
    // Convert the binary data into the array buffer
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
  
    // Create a Blob from the array buffer
    const blob = new Blob([arrayBuffer], { type: mimeType });
  
    // Convert the Blob into a File
    const file = new File([blob], filename, { type: mimeType });
  
    return file;
}