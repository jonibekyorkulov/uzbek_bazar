/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['organization'],
  staff: ['organization', 'staff'],
  user: ['user'],
  onlyGuest: [],
};

export default authRoles;
