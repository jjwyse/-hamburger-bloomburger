import { expect } from 'chai';
import { createAndJoin, retrieveAll } from 'server/db/group';

describe('group', () => {
  it('should support creating and joining a group', () => {
    const group = {
      name: `foo`,
      description: 'bar'
    };
    return createAndJoin(1, group)
      .then(createdGroup => {
        expect(createdGroup.id).to.not.be.null;
        expect(createdGroup.name).to.equal(group.name);

        return retrieveAll(1)
          .then(groups => {
            return groups
              .filter(g => g.name === group.name)
              .forEach(g => expect(g.is_member).to.be.true);
          });
      });
  });
});
