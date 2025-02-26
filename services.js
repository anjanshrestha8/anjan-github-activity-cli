import chalk from "chalk";

export const get = async (apiUrl, username) => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data) {
      console.log(chalk.red("An error occurred while fetching user activity."));
      return;
    }

    if (!data?.length) {
      console.log(chalk.grey(`No activity found for user ${username}`));
      return;
    }

    return data;
  } catch (error) {
    console.log(chalk.red(error.message));
    return null;
  }
};

export const getEvents = (activity) => {
  let message = "test";
  const { type, actor, repo, payload, created_at } = activity;

  switch (type) {
    case "PushEvent":
      message = `Pushed ${payload.size} commits at https://github.com/${repo.name}`;
      break;
    case "PullRequestEvent":
      message = `${payload.size} pull request at https://github.com/${repo.name}`;
      break;
    default:
      message = `Performed a ${type} event at ${repo.name}`;
      break;
  }

  return { type, created_at, message };
};
