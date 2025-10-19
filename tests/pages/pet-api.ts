import { APIRequestContext, request, APIResponse } from '@playwright/test';
import { PetResponse } from 'tests/models/pet-interface';
import { faker } from '@faker-js/faker';

const BASE_URL = 'https://petstore.swagger.io/';

export class AutomationExerciseService {
    
    private static async getRequestContext(): Promise<APIRequestContext> {
        return await request.newContext({
            baseURL: BASE_URL,
            extraHTTPHeaders: {
      'Content-Type': 'application/json'
    }
        });
    }

public static async addNewPetWithValidData(): Promise<APIResponse> {
  const context = await this.getRequestContext();

  const randomId = faker.number.int({ min: 100, max: 999 });
  const randomPetName = faker.animal.dog();
  const randomPhotoUrls = faker.internet.email();
  const statusOptions = ['available', 'pending', 'sold'] as const;
  const randomStatus = faker.helpers.arrayElement(statusOptions);

  const requestBody: PetResponse = {
  "id": randomId,
  "category": {
    "id": randomId,
    "name": "string"
  },
  "name": randomPetName,
  "photoUrls": [
    randomPhotoUrls
  ],
  "tags": [
    {
      "id": randomId,
      "name": "string"
    }
  ],
  "status": randomStatus
};

  const response = await context.post('/v2/pet', {
    data: requestBody,
  });

  return response;
}

public static async defineAddNewPetWithValidDataResponseSchema(): Promise<object> {
  const petSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    category: {
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" }
      },
      required: ["id","name"]
    },
    name: { type: "string" },
    photoUrls: { type: "array", items: { type: "string" } },
    tags: { 
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" }
        },
        required: ["id","name"]
      }
    },
    status: { type: "string", enum: ["available","pending","sold"] }
  },
  required: ["id","category","name","photoUrls","tags","status"]
};

return petSchema;
}

public static async defineAddNewPetWithWithOnlyRequiredFieldsResponseSchema(): Promise<object> {
  const petSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    photoUrls: {
      type: "array",
      items: { type: "string" }
    },
    tags: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" }
        },
        required: ["id", "name"]
      }
    }
  },
  required: ["id", "name", "photoUrls", "tags"],
  additionalProperties: false
};

return petSchema;
}


public static async addNewPetOnlyWithRequiredFields(): Promise<APIResponse> {
  const context = await this.getRequestContext();

  const randomId = faker.number.int({ min: 100, max: 999 });
  const randomPetName = faker.animal.dog();
  const randomPhotoUrls = faker.internet.email();
  const statusOptions = ['available', 'pending', 'sold'] as const;
  const randomStatus = faker.helpers.arrayElement(statusOptions);

  const requestBody = {
  "name": randomPetName,
  "photoUrls": [
    randomPhotoUrls
  ]
};

  const response = await context.post('/v2/pet', {
    data: requestBody,
  });

  return response;
}

public static async addNewPetOnlyWithEmptyBody(): Promise<APIResponse> {
  const context = await this.getRequestContext();

  const requestBody = '';

  const response = await context.post('/v2/pet', {
    data: requestBody,
  });

  return response;
}

};



