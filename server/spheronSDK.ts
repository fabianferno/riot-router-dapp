import { SpheronClient, ProtocolEnum } from "@spheron/storage";

const client = new SpheronClient({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiJhYTY5ZTNkODRmNGYyNTFiZDgxZmE3MzhkY2Q0NDU0ODkwMGQzNDM2OGE2ZjQ5MTg3ZWJlMzYxYjUyNmY1MjI2ODA4Y2VhMDIzYjI4NDIxZGNkYTY0MDJmZDVhYzUyZmVhZDllZTQ0ZWFlYmIxMjhiZjk3MDYyNGM0Yjk3ZmI1MCIsImlhdCI6MTY4NzA1NjMwNywiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.tmMkB8oKGvIEKmBXJ_5hJj2gA6ywodf16w2JkJK2SJ8",
});

let currentlyUploaded = 0;

(async () => {
  const { uploadId, bucketId, protocolLink, dynamicLinks, cid } =
    await client.upload("./eb51e149-7179-4129-b619-4d97d740daa3.car", {
      protocol: ProtocolEnum.IPFS,
      name: "carLink212121",
      onUploadInitiated: (uploadId) => {
        console.log(`Upload with id ${uploadId} started...`);
      },
      onChunkUploaded: (uploadedSize, totalSize) => {
        currentlyUploaded += uploadedSize;
        console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
      },
    });

  console.log(`Upload with id ${cid} finished.`, {
    uploadId,
    bucketId,
    protocolLink,
    dynamicLinks,
    cid,
  });
})();
