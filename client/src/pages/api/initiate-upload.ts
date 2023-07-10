import { SpheronClient, ProtocolEnum } from '@spheron/storage';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const protocol = ProtocolEnum.IPFS; // use your preferred protocol
    const token = process.env.NEXT_PUBLIC_SPHERON_STORAGE_TOKEN; // add your access token in .env or paste it here

    const client = new SpheronClient({ token: token ? token : '' });

    const { uploadToken } = await client.createSingleUploadToken({
      name: 'the-riot-protocol',
      protocol,
    });

    res.status(200).json({
      uploadToken,
    });
  } catch (error) {
    console.error(error);
  }
}
