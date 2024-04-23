import browser from "webextension-polyfill";

// browser.runtime.onMessage.addListener((msg) => {
//     console.log(msg);
//     }
// );
type Message = {
  action: 'fetch',
  value: null
}

type ResponseCallback = (data: object) => void

async function handleMessage({action, }: Message, response: ResponseCallback) {
  if (action === 'fetch') {
    console.log('fetching data');
    
    const result = await fetch('https://meowfacts.herokuapp.com/');

    const { data } = await result.json();

    response({ message: 'success', data });
  } else {
    response({data: null, error: 'Unknown action'});
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment

browser.runtime.onMessage.addListener((msg, sender, response) => {
  handleMessage(msg, response);
  return true;
});