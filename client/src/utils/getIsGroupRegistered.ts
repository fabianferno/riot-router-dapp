import contractCall from '../components/metamask/lib/contract-call';

async function getIsGroupRegistered(
  contractAddress: any,
  currentAccount: any,
  ABI: any,
  hash: any,
  setButtonText: any,
) {
  if (hash != '') {
    const isRegistered = await contractCall(
      contractAddress,
      currentAccount,
      ABI,
      [hash],
      0,
      'isGroupRegistered(bytes32)',
      true,
    );

    if (isRegistered) {
      setButtonText('Mint Device');
    } else {
      setButtonText('Register and Mint Device');
    }
  }
}
export default getIsGroupRegistered;
