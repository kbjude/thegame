import scores from '../js/topscores';
import scoresAPI from '../js/scoresAPI';


describe('scoresAPI', () => {
  describe('gettop', () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        result: [
          { user: 'Player1', score: 1 },
          { user: 'Player2', score: 2 },
          { user: 'Player4', score: 3 },
          { user: 'Player5', score: 7 },
          { user: 'Player7', score: 1 },
          { user: 'Player1', score: 0 },
          { user: 'Player1', score: 0 },
        ],
      }),
    );

    let response = '';

    test('it should retrieve a maximum of 5 results', async () => {
      response = await scoresAPI.gettop();
      expect(response.length).toBe(5);
    });

    test('it should fetch the right url', () => {
      expect(fetch.mock.calls[0][0]).toEqual(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdz/scores/',
      );
    });
  });

  describe('save', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    fetch.mockResponseOnce(
      JSON.stringify({
        result: 'Creation of the Leaderboard score',
      }),
    );

    test('it should be unknown with an empty name', async () => {
      scores.user.user = null;
      await scoresAPI.save();
      expect(scores.user.user).toBe('Unknown');
    });

    test('it should upload 1 if score is o', async () => {
      scores.user.score = 0;
      await scoresAPI.save();
      expect(scores.user.score).toBe(1);
    });

    test('it should use fetch only once', async () => {
      await scoresAPI.save();
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});