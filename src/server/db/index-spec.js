import db from 'server/db';
import { expect } from 'chai';

describe('db', () => {
  it('should support connecting to the database', () => {
    // this is not a unit test...i know
    return db.query('SELECT NOW() as now')
      .then(res => expect(res.rows).to.have.length(1));
  });
});
