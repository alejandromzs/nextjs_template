# Features
* Registration:
    * pages/api/register
    * pages/register
* Login:
    * pages/api/login
    * pages/login
* ProtectedRoutes:
    * components/protectedRoute
* rateLimiter: To limit the number of times an ip can call to an api
    * utils/rateLimiter.js
        * 4 max per ip in 1 minute
    * pages/api/register.js
* jsonwebtoken authentication: (Not save in anyStorage. Less risky to use with Cookies)
    * httponly; true  //Cookie only can be accessible on server
    * utils/auth.js 
* save & read CSV:
    * utils/users.js
    * public/users.csv
* standard Library: To lint code
    * npm install standard -b 
    * package.json: Configured to use standard for eslintconfig
* db-local Library: To configure a local db instead of csv
    * npm istall db-local
    * Use for testing only
    * lib/repositories/userRepository.js
        * utils.users.js to userRepository.js
        * Additional validations:
            * Before register the user, the user shouldn't exist
* jest
    * Installation manual:
        * npm install --save-dev jest
        * npm install jest --global (to run jest with different configs)
            * jest my-test --notify --config=config.json
        * npm init jest@latest
            * to create configuration file
        * npm install --save-dev babel-jest @babel/core @babel/preset-env
            * To use Babel
        * babel.config.js   (Config will depend on project: https://babeljs.io/docs/)
            *   module.exports = {
                presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
                };
        * npm install --save-dev @babel/preset-typescript
            * For typescript 
            * It will need to add '@babel/preset-typescript',
            * Additional details to review: ts-jest, @jest/globals, @types/jest
        * eslint
    * Real installation
        * npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
        * new file named jest.config.js
        * package.json: "test": "jest --watch"


## Libraries Restrictions
* Using "jsonwebtoken": "8.5.1" due to the 9.0.2 has issues verifying the token https://github.com/auth0/node-jsonwebtoken/issues/939
 
## Configurations
* net.config.mjs will get env info from .env.local
* create .env.local with valide details:
    * SECRET_JWT='yourSecretHere' 




## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

 

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
