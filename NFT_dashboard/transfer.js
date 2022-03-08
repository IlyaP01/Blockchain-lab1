let appId = "qi6egNd9Y8wLDLMIGJy17AMdBMro1kDnOBGpIiKP";
let serverUrl ="https://wdexfxutdjs4.usemoralis.com:2053/server";

const CONTRACT_ADDRESS = "0xe13c397375fd915af6d9b584c4fa9995e70fa067"

Moralis.start({ serverUrl, appId });

let web3;

async function init() {
    let currentUser = Moralis.User.current();
    if (!currentUser) {
        window.location.pathname = "/index.html";
    }

    web3 = await Moralis.Web3.enable();

    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    document.getElementById("token_id_input").value = nftId;
}

async function transfer() {
    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value;
    let amount = parseInt(document.getElementById("amount_input").value);

    const options = {type: "erc1155",
                     receiver: address,
                     contract_address: CONTRACT_ADDRESS,
                     token_id: tokenId.toString(),
                     amount: amount}
    let result = await Moralis.transfer(options);
    console.log(result);
}

document.getElementById("submit_transfer").onclick = transfer;

init();