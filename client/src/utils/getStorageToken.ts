export default async function getUploadToken() {
  try {
    const response = await fetch('/api/initiate-upload', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    const { uploadToken } = data;
    console.log('Received upload Token: ' + uploadToken);
    return uploadToken;
  } catch (e) {
    console.log(e);
  }
}
