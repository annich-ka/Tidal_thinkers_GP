# Tidal_thinkers_GP

## GitHub Workflow Guide

This guide explains the basic Git/GitHub workflow for this group project. The goal is to keep everyone working on the latest version of the code and avoid accidentally overwriting each other's work.

We are using one main branch for now: `main`.

## 1. Initial Setup

You only need to do this once on your computer.

### Install Git

Check whether Git is already installed:

```bash
git --version
```

If Git is not installed, download it from:

https://git-scm.com/downloads

### Install VS Code

VS Code is recommended because it has built-in Git support:

https://code.visualstudio.com/

### Set Your Git Name and Email

Git uses this information to show who made each commit.

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Use the same email address that you use for GitHub if possible.

## 2. Clone the Repository

Cloning means downloading the project from GitHub to your computer.

Choose where you want to keep the project on your computer, then run:

```bash
git clone https://github.com/annich-ka/Tidal_thinkers_GP.git
```

Then enter the project folder:

```bash
cd Tidal_thinkers_GP
```

If you use VS Code, you can then open the project with:

```bash
code .
```

You only clone the repository once. After that, you use `git pull` to update your existing copy.

## 3. Logging In to GitHub

To download public code, cloning is usually enough. To push your own changes back to GitHub, GitHub needs to know who you are.

There are two common options:

### Option A: Use VS Code

This is probably the easiest option.

1. Open the project folder in VS Code.
2. Click the Source Control icon on the left side.
3. When VS Code asks you to sign in to GitHub, follow the browser login steps.
4. After signing in, VS Code can usually handle pushing and pulling for you.

### Option B: Use SSH

SSH is a more technical setup, but it works well once configured. GitHub's official guide is here:

https://docs.github.com/en/authentication/connecting-to-github-with-ssh

If you use SSH, the clone command looks like this instead:

```bash
git clone git@github.com:annich-ka/Tidal_thinkers_GP.git
```

For this project, VS Code login is likely the friendlier option.

## 4. The Everyday Workflow

Use this workflow every time you work on the project.

### Step 1: Open the Project Folder

Go into the project folder:

```bash
cd Tidal_thinkers_GP
```

### Step 2: Get the Latest Version

Before editing anything, always pull the newest changes from GitHub:

```bash
git pull
```

This updates your local project with anything your teammates pushed.

In simple terms, `git pull` means: "get the newest version from GitHub and update my local files."

You may also hear about `git fetch`. `git fetch` checks what changed on GitHub, but it does not update your files by itself. For our normal workflow, `git pull` is the command we want most of the time.

Example:

- You work on Monday and push your changes.
- A teammate works on Tuesday and pushes their changes.
- On Wednesday, you run `git pull`.
- Now your computer has the teammate's Tuesday changes too.

### Step 3: Make Your Changes

Edit the files you need to work on.

### Step 4: Check What Changed

Before saving your work to Git, check which files changed:

```bash
git status
```

This shows files that were modified, added, or deleted.

### Step 5: Add the Files You Want to Commit

`git add` tells Git which changed files should be included in your next commit.

To add one file:

```bash
git add filename
```

Example:

```bash
git add README.md
```

To add all changed files:

```bash
git add .
```

Only use `git add .` if you are sure all changed files should be included.

### Step 6: Commit Your Changes

A commit is a saved checkpoint with a message explaining what changed.

```bash
git commit -m "Describe what you changed"
```

Good commit message examples:

```bash
git commit -m "Add homepage layout"
git commit -m "Fix login form styling"
git commit -m "Update database connection settings"
```

Try to make the message short but clear.

### Step 7: Push Your Changes to GitHub

Pushing uploads your commits to GitHub so the rest of the group can get them.

```bash
git push
```

After pushing, your teammates can run `git pull` to get your changes.

If `git push` is rejected, it usually means someone else pushed changes before you. In that case, run:

```bash
git pull
git push
```

If there is a conflict after `git pull`, fix the conflict first, then add, commit, and push again.

## 5. Short Version

Most of the time, the workflow is:

```bash
cd Tidal_thinkers_GP
git pull

# make your changes

git status
git add .
git commit -m "Explain what changed"
git push
```

## 6. Important Team Rules

1. Always run `git pull` before you start working.
2. Commit small, logical changes instead of one huge commit.
3. Write clear commit messages.
4. Do not edit the same file at the same time if you can avoid it.
5. Tell the group before making large changes.
6. Run or test the project before pushing if possible.
7. If Git shows a warning or error that you do not understand, ask before forcing anything.

## 7. What If Git Says There Is a Conflict?

A conflict can happen when two people edit the same part of the same file.

If this happens, Git will ask you to choose which version to keep. VS Code usually shows conflict sections clearly and gives buttons like:

- Accept Current Change
- Accept Incoming Change
- Accept Both Changes

If you are unsure, ask the group before choosing. Do not randomly accept changes, because this can delete someone else's work.

After fixing the conflict, usually you finish with:

```bash
git add .
git commit -m "Resolve merge conflict"
git push
```

## 8. Useful Commands

Check the current state of your files:

```bash
git status
```

Download the latest changes:

```bash
git pull
```

See recent commits:

```bash
git log --oneline
```

Check what changed on GitHub without updating your files:

```bash
git fetch
```

Add files to the next commit:

```bash
git add .
```

Create a commit:

```bash
git commit -m "Your message"
```

Upload your commits:

```bash
git push
```

## 9. Recommended Simple Group Workflow

Because this is a small group project, we can keep the workflow simple:

1. Everyone works on the `main` branch.
2. Before starting work, run `git pull`.
3. After finishing a useful piece of work, run `git add`, `git commit`, and `git push`.
4. Communicate in the group chat about who is working on which files.
5. Avoid force-pushing or deleting files unless everyone agrees.

This is not the most advanced Git workflow, but it is a good starting point for a small project.
