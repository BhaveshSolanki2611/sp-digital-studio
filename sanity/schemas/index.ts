// Sanity Schema Index
// These schemas are ready to be used in a Sanity Studio project

import portfolio from './portfolio'
import post from './post'
import author from './author'
import category from './category'

export const schemaTypes = [portfolio, post, author, category]

/*
To set up Sanity Studio:

1. Go to https://www.sanity.io/manage and create a new project
2. Name it "SP Digital Studio"
3. Copy the Project ID
4. Add to .env.local:
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production

5. Create a new Sanity Studio in a separate folder or use embedded studio:
   npx sanity@latest init --env

6. Copy these schema files to your Sanity Studio's schemas folder

Alternative: Use Sanity Studio embedded in Next.js
- See: https://www.sanity.io/docs/nextjs-app-router-personal-website-blog

Current Sanity API Token in .env.local can be used for server-side operations.
*/
