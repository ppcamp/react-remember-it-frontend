export enum UserGrade {
  TotalBlackout,
  VeryWrong,
  Wrong,
  Ok,
  WellDone,
  Easy,
}

type SM2Args = {
  q: UserGrade;
  n: number;
  EF: number;
  I: number;
};
type SM2Returns = {
  n: number;
  EF: number;
  I: number;
};

/**
 * Does the algorithm for each revised card
 * @param q The value of the button, mapped between [0-5]. Check `UserGrade` enum.
 * @param n The number of repetitions
 * @param EF The easiness factor (got it from a deck)
 * @param I The interval
 * @returns Updated values of `n`, `EF`, and `I`
 *
 * @see https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
 * @see https://www.supermemo.com/en/archives1990-2015/english/ol/sm5
 *
 * Description of SM-2 algorithm
 * -----------------------------
 * The first computer-based SuperMemo algorithm (SM-2)[9] tracks three properties for each card
 *  being studied:
 *
 * - The repetition number n, which is the number of times the card has been successfully
 *      recalled (meaning it was given a grade ≥ 3) in a row since the last time it was not.
 * - The easiness factor EF, which loosely indicates how "easy" the card is (more precisely,
 *      it determines how quickly the inter-repetition interval grows). The initial value of EF is 2.5.
 * - The inter-repetition interval I, which is the length of time (in days) SuperMemo will
 *      wait after the previous review before asking the user to review the card again.
 *
 * Every time the user starts a review session, SuperMemo provides the user with the cards whose
 *  last review occurred at least I days ago. For each review, the user tries to recall the
 *    information and (after being shown the correct answer) specifies a grade q (from 0 to 5)
 *      indicating a self-evaluation the quality of their response, with each grade having the
 *        following meaning:
 *
 * USER grade:
 * - [0] "Total blackout", complete failure to recall the information.
 * - [1] Incorrect response, but upon seeing the correct answer it felt familiar.
 * - [2] Incorrect response, but upon seeing the correct answer it seemed easy to remember.
 * - [3] Correct response, but required significant difficulty to recall.
 * - [4] Correct response, after some hesitation.
 * - [5] Correct response with perfect recall.
 * The following algorithm is then applied to update the three variables associated with the card:
 */
export const SM2 = ({ q, n, EF, I }: SM2Args): [number, number, number] => {
  let output: SM2Returns = { n: -1, EF: -1, I: -1 };
  // correct response
  if (q >= 3) {
    if (n === 0) {
      output.I = 1;
    } else if (n === 1) {
      output.I = 6;
    } else {
      output.I = I * EF;
    }

    output.EF = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if (output.EF < 1.3) {
      output.EF = 1.3;
    }

    output.n = n + 1;
  }
  // incorrect response
  else {
    output.n = 0;
    output.I = 1;
  }

  return [output.n, output.EF, output.I];
};
