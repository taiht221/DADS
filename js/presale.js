;(() => {
  const dads = document.getElementById('DADS')
  const usdt = document.getElementById('USDT')

  dads.addEventListener('change', updateValue)

  function updateValue(e) {
    usdt.value = (Number(e.target.value).toFixed(4) / 0.012).toFixed(2)
  }

  if (document.getElementById('copyButton')) {
    document.getElementById('copyButton').addEventListener('click', () => {
      // Get the text field
      var copyText = document.getElementById('copyInput')

      // Select the text field
      copyText.select()
      copyText.setSelectionRange(0, 99999) // For mobile devices

      // Copy the text inside the text field
      navigator.clipboard.writeText(copyText.value)
    })
  }

  const loginButton = document.getElementById('loginButton')
  const userWallet = document.getElementById('userWallet')
  function toggleButton() {
    if (!window.ethereum) {
      loginButton.innerText = 'MetaMask is not installed'
      loginButton.classList.remove('bg-purple-500', 'text-white')
      loginButton.classList.add(
        'bg-gray-500',
        'text-gray-100',
        'cursor-not-allowed'
      )
      return false
    }

    loginButton.addEventListener('click', loginWithMetaMask)
  }
  async function loginWithMetaMask() {
    const accounts = await window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(async (e) => {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }], // chainId must be in hexadecimal numbers
        })
        if (window.ethereum) {
          try {
            // check if the chain to connect to is installed
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x38' }], // chainId must be in hexadecimal numbers
            })
          } catch (error) {
            // This error code indicates that the chain has not been added to MetaMask
            // if it is not, then install it into the user MetaMask
            if (error.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: window.userWalletAddress,
                      rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
                    },
                  ],
                })
              } catch (addError) {
                console.error(addError)
              }
            }
            console.error(error)
          }
        } else {
          // if no window.ethereum then MetaMask is not installed
          alert(
            'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html'
          )
        }
        
      })
      .catch((e) => {
        console.error(e.message)
        return
      })
    if (!accounts) {
      return
    }
    
    console.log(accounts);
    window.userWalletAddress = accounts[0]
    userWallet.innerText = window.userWalletAddress
    loginButton.innerText = 'Sign out of MetaMask'

    loginButton.removeEventListener('click', loginWithMetaMask)
    setTimeout(() => {
      loginButton.addEventListener('click', signOutOfMetaMask)
    }, 200)
  }
  function signOutOfMetaMask() {
    window.userWalletAddress = null
    userWallet.innerText = ''
    loginButton.innerText = 'Sign in with MetaMask'

    loginButton.removeEventListener('click', signOutOfMetaMask)
    setTimeout(() => {
      loginButton.addEventListener('click', loginWithMetaMask)
    }, 200)
  }
  window.addEventListener('DOMContentLoaded', () => {
    toggleButton()
  })
})()
