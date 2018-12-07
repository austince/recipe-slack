const path = require('path');

const SELECTOR_BADGE_COUNT = '#conversations .navigation-item .navigation-badge-count';

function getMessages() {
  const directMessages = document.querySelectorAll(SELECTOR_BADGE_COUNT);
  return Array.from(directMessages)
    .reduce((totalCount, elem) => {
      const numMessages = Number(elem.innerText);
      if (Number.isNaN(numMessages)) {
        return totalCount;
      }
      return totalCount + numMessages;
    }, 0);
}


module.exports = (Franz) => {
  Franz.loop(() => {
    const messages = getMessages();
    Franz.setBadge(messages);
  });

  Franz.injectCSS(path.join(__dirname, 'service.css'));
};
