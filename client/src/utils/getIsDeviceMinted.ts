import contractCall from '../components/metamask/lib/contract-call';
import getIsGroupRegistered from './getIsGroupRegistered';

async function getIsDeviceIdMinted(
  contractAddress: any,
  currentAccount: any,
  ABI: any,
  hash: any,
  setButtonText: any,
  setDeviceMinted: any,
) {
  if (hash != '') {
    const isDeviceMinted = await contractCall(
      contractAddress,
      currentAccount,
      ABI,
      [hash],
      0,
      'isDeviceMinted(address)',
      true,
    );
    console.log(isDeviceMinted);
    if (isDeviceMinted == 'Invalid Params') {
      setButtonText('Invalid Device ID');
    } else if (isDeviceMinted == true) {
      setButtonText('Device already minted');
      setDeviceMinted(true);
    } else {
      setButtonText('Mint Device');
      setDeviceMinted(false);
    }
  }
}

export default getIsDeviceIdMinted;
