// Example of creating a new user
const newUser = await createUser({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  role: 'artist',
  slug: await generateUniqueSlug('John', 'Doe'),
});

// Example of retrieving a user
const user = await getUserById('some-user-id'); 