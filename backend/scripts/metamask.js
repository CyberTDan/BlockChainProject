if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
}

// https://docs.metamask.io/wallet/how-to/connect/access-accounts/
const ethereumButton = document.querySelector('#enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
    getAccount();
});

async function getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((err) => {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log('Please connect to MetaMask.');
            } else {
                console.error(err);
            }
        });
    const account = accounts[0];
    showAccount.innerHTML = account;
}