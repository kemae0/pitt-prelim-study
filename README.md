# Pitt Prelim Study

Hosted at https://kemae.neocities.org/pitt-prelim-study/.

## Automatic updates

`.github/workflows/neocities.yml` publishes this app on every push to `main`.
It stages the app under `public/pitt-prelim-study/`, uploads changed files,
and leaves other Neocities files in place (`cleanup: false`).

One-time setup in `kemae0/pitt-prelim-study`:

1. Open Settings > Secrets and variables > Actions > New repository secret.
2. Name it `NEOCITIES_API_TOKEN` and use the existing API key for the kemae
   Neocities site. Find the key in Neocities Settings; GitHub does not reveal
   an existing secret's value from the website repository.
3. Commit and push this workflow to `main`. Open Actions to check the result.

After setup, normal `git add`, `git commit`, and `git push` publish app updates
without manually running the main website workflow. Manual runs are also
available in Actions under Publish Pitt Prelim Study to Neocities.

The main website's existing workflow can still refresh this app from `main`
when publishing website changes. Allow an active deployment to finish before
starting a deployment from the other repository.
