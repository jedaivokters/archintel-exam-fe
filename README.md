
# Archintel-exam Frontend

**Local System Requirements:**

1. Install Node v12

2. Install NPM

**How to run in local:**

1. (terminal) Go to root folder then run : `npm i`

2. copy `env.example` to `.env` 
	- change value e.g. `VUE_APP_API_BASE_URL=http://localhost:8000/api`
	- `http://localhost:8000` --> this should be the value from laravel when you run `php artisan serve`
3. (terminal) run `npm run serve`
4. Browse the provided URL from the run serve command

**Initial pages**
1. Superadmin : `(FE URL)/superadmin`
	-  You can create initial users
	- Once user created you can visit on different dashboard (Writer or Editor)