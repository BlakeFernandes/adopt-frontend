## TODO
1. Pass in Puppy object to PuppyPage to prevent (for main puppy details) a loading state
2. Test image caching, seems to be refetching images every request, might be Cache-Control?
3. LazyLoading of Puppies on homepage
4. Save scroll position when returning to home page from puppy page
5. Proper error handling for adopt form, display errors from backend (Possibly react-hook-form & zod)
6. Add layer colours variables to globals.css
7. Migrate all other buttons and inputs to components from shadcn
8. Migrate Partial<Puppy> in PuppyForm to something a bit more stable over long-term
9. Hook up backend errors to form on PuppyForm
10. Add tests for Admin page
11. Toast or something similar to display status of PuppyForm submission
12. Clean up admin/form code