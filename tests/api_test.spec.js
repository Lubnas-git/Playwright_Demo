import { test, expect } from '@playwright/test';

//api request context used instead of page here
test('API GET Request', async ({ request }) => {
    //since a request returns a response, we would have to store it in a variable 
    const response = await request.get('https://reqres.in/api/users/2');

    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain('Janet');

    console.log(await response.json());

});

test('API POST Request', async ({ request }) => {
    //since a request returns a response, we would have to store it in a variable 
    const response = await request.post('https://reqres.in/api/users', {
        data: {
            "name": "morpheus",
            "job": "leader"
        }
    });

    expect(response.status()).toBe(201);

    const text = await response.text();
    expect(text).toContain('Janet');

    console.log(await response.json());

});

test('API PUT Request', async ({ request }) => {
    //since a request returns a response, we would have to store it in a variable 
    const response = await request.put('https://reqres.in/api/users/2', {
        data: {
            "name": "Lubna",
            "job": "leader"
        }
    });

    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain('Lubna');

    console.log(await response.json());

});

test('API DELETE Request', async ({ request }) => {
    //since a request returns a response, we would have to store it in a variable 
    const response = await request.delete('https://reqres.in/api/users/2');

    expect(response.status()).toBe(204);

});