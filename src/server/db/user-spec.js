import { expect } from 'chai';
import { upsert } from 'server/db/user';

describe('user', () => {
  it('should support upserting a new or existing user', () => {
    const githubUser = {
      id: 1,
      login: 'frank',
      name: 'Frank',
      bio: 'Sr Software Eng @ FullContact',
      avatar_url: 'foo',
      access_token: 'abc123'
    };

    return upsert(githubUser)
      .then(createdUser => expect(createdUser.last_login).to.be.a('date'));
  });
});
