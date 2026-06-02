import express from 'express';

// ========
import { testAnswersValidator } from '../../validators/test-answers.validator';
import getPersonalitiesCalculatorResults from '../../controllers/16-personalities/calculator/get-calculate-results.controller';
import getPersonalitiesCalculatorDisclaimer from '../../controllers/16-personalities/calculator/get-calculator-disclaimer.controller';
import getPersonalitiesCalculatorInformation from '../../controllers/16-personalities/calculator/get-calculator-information.controller';
import postPercentagesAndType from '../../controllers/16-personalities/getPercentages.controller';
import getQuestions from '../../controllers/16-personalities/getQuestions.controller';
import getTypeByResults from '../../controllers/16-personalities/getTypeByResults.controller';

const personalitiesRouter = express();

personalitiesRouter.post(
  '/16-personalities/answers',
  testAnswersValidator,
  postPercentagesAndType,
);
personalitiesRouter.post(
  '/16-personalities/calculator',
  getPersonalitiesCalculatorResults,
);

personalitiesRouter.get(
  '/16-personalities/calculator-information',
  getPersonalitiesCalculatorInformation,
);
personalitiesRouter.get(
  '/16-personalities/calculator-disclaimer',
  getPersonalitiesCalculatorDisclaimer,
);

personalitiesRouter.get('/16-personalities/questions', getQuestions);
personalitiesRouter.get(
  '/16-personalities/result/:personType',
  getTypeByResults,
);

export default personalitiesRouter;
