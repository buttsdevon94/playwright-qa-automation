import { test, expect } from '@playwright/test';

test('API returns the requested post', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.id).toBe(1);
  expect(responseBody.userId).toBe(1);
  expect(responseBody.title).toBeTruthy();
  expect(responseBody.body).toBeTruthy();
});

test('API creates a new post', async ({ request }) => {
  const newPost = {
    title: 'Playwright QA Automation Project',
    body: 'Created during an automated API test',
    userId: 1,
  };

  const response = await request.post(
    'https://jsonplaceholder.typicode.com/posts',
    {
      data: newPost,
    }
  );

  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  expect(responseBody.title).toBe(newPost.title);
  expect(responseBody.body).toBe(newPost.body);
  expect(responseBody.userId).toBe(newPost.userId);
  expect(responseBody.id).toBeTruthy();
});