import { Request, Response } from 'express';

import { Answer } from '../../types/16-personalities';
import addTypesInTestQuestions from '../../utils/16-personalities/test';
import beYourSelfService from '../../services/be-yourself.service';
import googleSheetsService from '../../services/google-sheets.service';

interface UserInformation {
  testName: string;
  timestamp: string;
  testPrice: string | null;
  device: string;
  routeTracker: string;
  referrer: string;
  isPreload: boolean;
}

const postPercentagesAndType = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const answers: Answer = req.body.answers;

    const amountQuestions: Record<string, number> =
      beYourSelfService.amountQuestionsInType(addTypesInTestQuestions());
    const { scores, percentages } = beYourSelfService.countPersonPercentages(
      answers,
      amountQuestions,
    );

    const personType = beYourSelfService.getCodedTypeName(scores);

    //
    res.status(200).send({
      personType,
      results: { scores, percentages, personType },
      message: 'Success post scores operation.',
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send('Internal server error');
  }
};

export default postPercentagesAndType;
