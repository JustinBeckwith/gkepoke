const {auth} = require('google-auth-library');
async function main() {
  const client = await auth.getClient({
    scopes: [
      'https://www.googleapis.com/auth/compute',
      'https://www.googleapis.com/auth/cloud-platform'
    ]
  });
  const projectId = 'el-gato';
  const zone = 'us-central1-c';
  const listVMsResp = await client.request({
    url: `https://www.googleapis.com/compute/v1/projects/${projectId}/zones/${zone}/instances`
  });
  const clusterVMs = listVMsResp.data.items.filter(x => x.name.includes('gke-el-gato'));
  clusterVMs.forEach(async vm => {
    const migrateResp = await client.request({
      url: `https://www.googleapis.com/compute/v1/projects/${projectId}/zones/${zone}/instances/${vm.id}/simulateMaintenanceEvent`,
      method: 'POST'
    });
    console.log(migrateResp.data);
    let progress = 0;
    while(progress < 100) {
      const statusRes = await client.request({
        url: migrateResp.data.selfLink
      });
      console.log(statusRes.data);
      progress = statusRes.data.progress;
      await new Promise(r => setTimeout(r, 1000));
    }
  });
}
main().catch(console.error);
