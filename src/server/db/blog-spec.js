import { expect } from 'chai';
import { retrieveAllForUser } from 'server/db/blog';

describe('blog', () => {
  it('should support retrieving all blogs for a user', () => {
    return retrieveAllForUser(4333193, 100, 0)
      .then(blogs => {
        expect(blogs).to.be.an('array');
        expect(blogs).to.have.length.above(0);
      });
  });
});
