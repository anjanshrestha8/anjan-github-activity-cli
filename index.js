#!/usr/bin/env node

import ora from "ora";
import chalk from "chalk";
import figlet from "figlet";
import { program } from "commander";
import { API_USERS } from "./constants.js";
import { get, getEvents } from "./services.js";

console.log(chalk.green(figlet.textSync("GitHub Activity")));

program
  .version("2.0.0")
  .description("This is a CLI to get git hub user activity");

const displayGithubActivity = async (username) => {
  username = username.trim();

  if (!username) {
    console.log(chalk.red("Please provide a github username."));
  }

  const apiUrl = `${API_USERS}/${username}/events`;

  const spinner = ora(
    chalk.grey(`Fetching ${username}'s activity......`)
  ).start();

  const data = await get(apiUrl, username);
  spinner.stop();

  console.log(
    chalk.green(`Hey, ${username}! Here are your recent activities on GitHub:`)
  );
  console.log(
    chalk.white("---------------------------------------------------------")
  );

  data?.map((activity) => {
    const { message } = getEvents(activity);

    if (message) {
      console.log(chalk.blue(`- ${message}`));
    }
  });
};
program.argument("<username>").action(displayGithubActivity);

program.parse(process.argv);
