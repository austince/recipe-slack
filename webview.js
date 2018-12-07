import path from 'path';

console.log('symphony recipe loaded');

const SELECTOR_BADGE_COUNT = '#conversations .navigation-item .navigation-badge-count';

function getMessages() {
  const directMessages = document.querySelectorAll(SELECTOR_BADGE_COUNT);
  console.log('symphony messsages', directMessages);
  return directMessages.reduce((totalCount, elem) => {
    const numMessages = Number(elem.innerText);
    if (Number.isNaN(numMessages)) {
      return totalCount;
    }
    return totalCount + numMessages;
  }, 0);
}


module.exports = (Franz) => {
  console.log('Franz loaded', Franz);
  Franz.loop(() => {
    console.log('Getting Symphony messages');
    const messages = getMessages();
    Franz.setBadge(messages);
  });

  Franz.injectCSS(path.join(__dirname, 'service.css'));
};
