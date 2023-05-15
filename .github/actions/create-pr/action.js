module.exports = async ({ github, context, core }) => {
  try {
    const { repo, owner } = context.repo;
    const { data } = await github.rest.pulls.create({
      title: "[NEW PR] Sync main",
      owner,
      repo,
      head: "sit",
      base: "main",
      body: [
        "This PR is auto-generated",
        "[Full history of actions](https://github.com/telus-csd-tvs/opus-sdm-newrelic/actions).",
      ].join("\n"),
    });
    await github.rest.issues.addLabels({
      owner,
      repo,
      issue_number: data.number,
      labels: ["feature", "automated pr"],
    });
    await github.rest.pulls.requestReviewers({
      owner,
      repo,
      pull_number: data.number,
      reviewers: ["tamy-vivas"],
    });

    core.notice(`PR created: ${data.number}`);
  } catch (error) {
    throw new Error(error);
  }
};
