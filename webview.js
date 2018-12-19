const path = require('path');

const SELECTOR_BADGE_COUNT = '#conversations .navigation-item .navigation-badge-count';

const INVALID_MESSAGE_CHAR_REGEX = /[+]/g;

function getNumberOfMessages() {
  const directMessages = document.querySelectorAll(SELECTOR_BADGE_COUNT);
  return Array.from(directMessages)
    .reduce((totalCount, elem) => {
      const badgeText = elem.innerText;
      // in range 1...50+
      const cleanedBadgeText = badgeText.replace(INVALID_MESSAGE_CHAR_REGEX, '');
      const numMessages = Number(cleanedBadgeText);
      if (Number.isNaN(numMessages)) {
        return totalCount;
      }
      return totalCount + numMessages;
    }, 0);
}


module.exports = (Franz) => {
  Franz.loop(() => {
    const messages = getNumberOfMessages();
    Franz.setBadge(messages);
  });

  Franz.injectCSS(path.join(__dirname, 'service.css'));
};
