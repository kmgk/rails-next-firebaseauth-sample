# README
## Versions
- Ruby : `2.7.2`
- Yarn : `1.22.4`
- Next.js : `10.0.3`

## Setup

```bash
$ bundle config set path 'vendor/bundle' --local
# install dependencies
$ bundle install
$ yarn --cwd ./frontend
# migration
$ bundle exec rails db:migrate
# start dev server
$ bundle exec foreman s
```