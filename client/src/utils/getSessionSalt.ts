import axios from 'axios';

const getSessionSalt = async () => {
  const response = await axios.get(
    'https://drand.cloudflare.com/8990e7a9aaed2ffed73dbd7092123d6f289930540d7651336225dc172e51b2ce/public/latest',
  );

  console.log('Session Salt: ', response.data);
  return response.data;
};

export default getSessionSalt;
