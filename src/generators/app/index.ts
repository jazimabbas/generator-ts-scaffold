import { QuestionCollection } from "inquirer";
import Generator from "yeoman-generator";

export default class AppGenerator extends Generator {
  async prompting() {
    const questions: QuestionCollection = [
      {
        type: "list",
        name: "packageManager",
        message: "Which package manager would you like to use?",
        choices: [
          { name: "npm", value: "npm" },
          { name: "yarn", value: "yarn" },
          { name: "pnpm", value: "pnpm" },
        ],
      },
    ];

    const answers = await this.prompt(questions);
    this.log(`You chose ${answers.packageManager} as your package manager.`);
  }
}
