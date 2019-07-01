const {GoogleAuth} = require('google-auth-library');

async function main() {
  while(true) {
    const auth = new GoogleAuth({
      scopes: [
        'https://www.googleapis.com/auth/cloud-platform'
      ]
    });
    try {
      const headers = await auth.getRequestHeaders();
      console.log(`${Date.now()}: ${headers.Authorization}`);
    } catch (e) {
      console.log(`${Date.now()}: ERROR`);
      console.log(e.message);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
}
main().catch(console.error);
