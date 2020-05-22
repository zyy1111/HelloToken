let accounts = "";
let inputValue = "";
const address = "http://13.56.163.182:8000/transfer-token";

const ethereumButton = document.querySelector(".connect");

function handleChange(val) {
  inputValue = val;
}

ethereumButton.addEventListener("click", () => {
  if(inputValue.toLowerCase() === 'hello') {
    submit();
  } else {
    alert("Please type 'hello' to get tokens!");
  }
});

async function submit() {
  let ethereum = window.ethereum;
  let web3 = window.web3;
  if (typeof ethereum !== 'undefined') {
    accounts = await ethereum.enable();
    web3 = new Web3(ethereum);
  } else if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVID));
  }

  fetch(address, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ticker: "HELLO",
      amount: 1,
      to: accounts[0],
      hookUrl: "test",
    }),
  }).then((res) => {
      if(res.status === 200) {
        alert("You have recieved one token!");
      }
  }).catch((err) => {
      console.log(err);
  });
}