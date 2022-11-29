import { contractUSDTAbiFragment, contractBSCSAbiFragment } from './contractAbi'
  ; (() => {
    const dads = document.getElementById('DADS')
    const usdt = document.getElementById('USDT')
    const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
    const loginButton = document.getElementById('loginButton')
    const userWallet = document.getElementById('userWallet')
    const walletID = document.getElementById('walletID')
    const buyButton = document.getElementById('buyButton')

    const ContractAddress = '0x55d398326f99059fF775485246999027B3197955'
    const ContractTestAddress = '0x0886dC84B4263d3A9420B90CB2b185407a4D41e3'

    let targetAddress = '0x2b67e0ec1475C6c79a056acF93B128Dd0b90190b'
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()

    let contract = new ethers.Contract(
      ContractAddress,
      contractUSDTAbiFragment,
      signer
    )

    function updateValue(e) {
      dads.value = (Number(e.target.value).toFixed(4) / 0.012).toFixed(2)
    }
    usdt.addEventListener('change', updateValue)

    // Copy button function
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

    // Check wallet ID
    if (window.ethereum.selectedAddress) {
      buyButton.removeAttribute('disabled')
      buyButton.classList.remove('cursor-not-allowed')
      const match = window.ethereum.selectedAddress
        .toString()
        .match(truncateRegex)
      walletID.textContent = `${match[1]}…${match[2]}`
    }
    // Check the metamask wallet install
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

    window.addEventListener('DOMContentLoaded', () => {
      toggleButton()
    })
    // login metamask function
    async function loginWithMetaMask() {
      const accounts = await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async (e) => {
          const match = e.toString().match(truncateRegex)
          walletID.textContent = `${match[1]}…${match[2]}`

          if (window.ethereum) {
            try {
              // check if the chain to connect to is installed
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x61' }],
                // params: [{ chainId: '0x38' }],
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

      console.log(accounts)
      window.userWalletAddress = accounts[0]
      userWallet.innerText = window.userWalletAddress
      loginButton.innerText = 'Sign out of MetaMask'

      loginButton.removeEventListener('click', loginWithMetaMask)
      setTimeout(() => {
        loginButton.addEventListener('click', signOutOfMetaMask)
      }, 200)
    }

    // Get value of total DADS buy
    window.ethereum.on('accountsChanged', (accounts) => {
      // If user has locked/logout from MetaMask, this resets the accounts array to empty
      if (!accounts.length) {
        buyButton.setAttribute('disabled')
        buyButton.classList.add('cursor-not-allowed')
        // logic to handle what happens once MetaMask is locked
      } else {
        buyButton.removeAttribute('disabled')
        buyButton.classList.remove('cursor-not-allowed')
      }
    })



    async function transferToken() {
      let amount = usdt.value
      if (!amount) return
      try {
        await contract.transfer(
          '0x871C5F91922A25aaDfE08730973E47d651B19B89',
          ethers.utils.parseEther(amount)
        )
      } catch (error) {
        if (error) console.log(error.data)
      }
    }
    buyButton.addEventListener('click', transferToken)
  })()

// function signOutOfMetaMask() {
//   window.userWalletAddress = null
//   userWallet.innerText = ''
//   loginButton.innerText = 'Sign in with MetaMask'

//   loginButton.removeEventListener('click', signOutOfMetaMask)
//   setTimeout(() => {
//     loginButton.addEventListener('click', loginWithMetaMask)
//   }, 200)
// }
1
