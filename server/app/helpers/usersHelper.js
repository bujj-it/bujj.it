const filteredUserAttributesList = ['userId', 'username', 'email', 'spendingPlan'];

/* eslint-disable no-param-reassign */
function filterUserAttributes(user) {
  const filtered = Object.keys(user)
    .filter((key) => filteredUserAttributesList.includes(key))
    .reduce((obj, key) => {
      obj[key] = user[key];
      return obj;
    }, {});

  return filtered;
}
/* eslint-enable no-param-reassign */

module.exports = {
  filteredUserAttributesList,
  filterUserAttributes,
};
