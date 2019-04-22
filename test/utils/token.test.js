require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('tokens', () => {

  it('creates a token', () => {
    const token = tokenize({
      _id: '1245',
      email: 'someperon@place.com'
    });
    expect(token).toEqual(expect.any(String));
    expect(token.split('.').length).toEqual(3);
  });

  it('return payload for a token', () => {
    const token = tokenize({
      name: 'Noodle',
      species: 'dumb chicken'
    });
    expect(untokenize(token).payload).toEqual({
      name: 'Noodle',
      species: 'dumb chicken'
    });
  });

  it('can verify token with expiration of one day (86400 seconds', () => {
    const token = tokenize({
      name: 'Noodle',
      species: 'dumb chicken'
    });
    expect(untokenize(token).exp - untokenize(token).iat).toEqual(86400);
  });
});
