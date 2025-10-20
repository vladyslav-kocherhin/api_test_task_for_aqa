import { test, expect } from '@playwright/test';
import { AutomationExerciseService } from 'tests/pages/pet-api';
import { PetResponse } from 'tests/models/pet-interface';
import { validateSchemaAjv } from 'playwright-schema-validator';

test.describe('Pet API Tests', () => {

    test('POST. Should verify that new pet can be added with valid data', async () => {

        const response = await AutomationExerciseService.addNewPetWithValidData();
        const responseBody: PetResponse = await response.json();
        const petSchema = await AutomationExerciseService.defineAddNewPetWithValidDataResponseSchema();

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const headers = response.headers();
        expect(headers['content-type']).toContain('application/json');
        expect(headers['access-control-allow-headers']).toContain('Content-Type, api_key, Authorization');
        expect(headers['access-control-allow-methods']).toContain('GET');
        expect(headers['access-control-allow-methods']).toContain('POST');
        expect(headers['access-control-allow-methods']).toContain('PUT');
        expect(headers['access-control-allow-methods']).toContain('DELETE');
        expect(headers['access-control-allow-origin']).toBe('*');
        expect(headers['server']).toContain('Jetty');

        await validateSchemaAjv({}, responseBody, petSchema);

        expect(typeof responseBody.id).toBe('number');
        expect(typeof responseBody.name).toBe('string');
        expect(typeof responseBody.status).toBe('string');

        expect(typeof responseBody.category).toBe('object');
        expect(typeof responseBody.category.id).toBe('number');
        expect(typeof responseBody.category.name).toBe('string');

        expect(Array.isArray(responseBody.photoUrls)).toBeTruthy();
        expect(typeof responseBody.photoUrls[0]).toBe('string');

        expect(Array.isArray(responseBody.tags)).toBeTruthy();
        expect(typeof responseBody.tags[0].id).toBe('number');
        expect(typeof responseBody.tags[0].name).toBe('string');
        expect(responseBody.status).toMatch(/^(available|pending|sold)$/);
        
    });

    test('POST. Should verify that new pet with only required fields can be added', async () => {

        const response = await AutomationExerciseService.addNewPetOnlyWithRequiredFields();
        const responseBody = await response.json();
        const petSchema = await AutomationExerciseService.defineAddNewPetWithWithOnlyRequiredFieldsResponseSchema();

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const headers = response.headers();
        expect(headers['content-type']).toContain('application/json');
        expect(headers['access-control-allow-headers']).toContain('Content-Type, api_key, Authorization');
        expect(headers['access-control-allow-methods']).toContain('GET');
        expect(headers['access-control-allow-methods']).toContain('POST');
        expect(headers['access-control-allow-methods']).toContain('PUT');
        expect(headers['access-control-allow-methods']).toContain('DELETE');
        expect(headers['access-control-allow-origin']).toBe('*');
        expect(headers['server']).toContain('Jetty');

        await validateSchemaAjv({}, responseBody, petSchema);

        expect(typeof responseBody.id).toBe('number');
        expect(typeof responseBody.name).toBe('string');

        expect(Array.isArray(responseBody.photoUrls)).toBeTruthy();
        expect(typeof responseBody.photoUrls[0]).toBe('string');

        expect(Array.isArray(responseBody.tags)).toBeTruthy();
        
    });

    test('POST. Should verify that new pet with empty request body can`t be added', async () => {

        const response = await AutomationExerciseService.addNewPetOnlyWithEmptyBody();
        const responseBody = await response.json();

        expect(response.status()).toBe(400);
        expect(responseBody.message).toBe('Bad Request');
        
    });

    test('POST. Should verify that new pet can`t be added without required name field in request', async () => {

        const response = await AutomationExerciseService.addNewPetWithoutRequiredNameField();
        const responseBody = await response.json();

        expect(response.status()).toBe(400);
        expect(responseBody.message).toBe('Bad Request');
        
    });

    test('POST. Should verify that new pet can`t be added without required photoUrls field in request', async () => {

        const response = await AutomationExerciseService.addNewPetWithoutRequiredphotoUrlsField();
        const responseBody = await response.json();

        expect(response.status()).toBe(400);
        expect(responseBody.message).toBe('Bad Request');
        
    });

});


        
    
