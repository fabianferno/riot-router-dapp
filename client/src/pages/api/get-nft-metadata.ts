import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { contractAddress, tokenId, accessToken } = req.body;
  console.log(req.body);
  try {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({ contractAddress: contractAddress, tokenId: tokenId, resync: false }),
    };

    fetch('https://web3.luniverse.io/v1/polygon/mumbai/nft/getNftMetadataByTokenId', options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        res.status(200).json(JSON.parse(response.data.rawMetadata));
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err });
      });
  } catch (error) {
    // Handle any errors that occur during the deployment process
    console.error('Error getting data:', error);
    res.status(500).json({ error });
  }
}
