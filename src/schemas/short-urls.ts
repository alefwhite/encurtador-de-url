import { FastifySchema } from "fastify"

export const create_short_urls: FastifySchema = {
  description: "Create a new short URL",
  tags: ["short-urls"],
  body: {
    type: "object",
    properties: {
      original_url: { type: "string", format: "uri" },
      user_id: { type: "string" },
    },
    required: ["original_url"],
  },
  response: {
    201: {
      description: "Successful response",
      type: "object",
      properties: {
        short_url: { type: "string", format: "uri" },
      },
    },
    400: {
      description: "Invalid URL",
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
}

export const get_short_url_by_short_code: FastifySchema = {
  description: "Get a short URL by its short code",
  tags: ["short-urls"],
  params: {
    type: "object",
    properties: {
      short_code: { type: "string" },
    },
    required: ["short_code"],
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        original_url: { type: "string", format: "uri" },
      },
    },
    404: {
      description: "Resource not found",
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
}

export const get_short_urls_by_user_id: FastifySchema = {
  description: "Get short URLs created by the authenticated user",
  tags: ["short-urls"],
  response: {
    200: {
      description: "Successful response",
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          original_url: { type: "string", format: "uri" },
          short_code: { type: "string" },
          click_count: { type: "number" },
          created_at: { type: "string", format: "date-time" },
          updated_at: { type: "string", format: "date-time" },
          deleted_at: { type: "null" },
        },
      },
    },
    401: {
      description: "Unauthorized",
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
}

export const delete_short_url: FastifySchema = {
  description: "Delete a short URL by the authenticated user",
  tags: ["short-urls"],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    204: {
      description: "Successful response",
      type: "null",
    },
    404: {
      description: "Resource not found",
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
    403: {
      description: "Short URL belongs to another user",
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
    410: {
      description: "Short URL already deleted",
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
}

export const update_short_url: FastifySchema = {
  description: "Update a short URL by the authenticated user",
  tags: ["short-urls"],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  body: {
    type: "object",
    properties: {
      original_url: { type: "string", format: "uri" },
    },
    required: ["original_url"],
  },
  response: {
    200: {
      description: "Short URL updated successfully",
      type: "object",
      properties: {
        short_url: { type: "string", format: "uri" },
      },
    },
    404: {
      description: "Short URL not found",
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
    403: {
      description: "Short URL belongs to another user",
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
    409: {
      description: "Original URL is already registered",
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
    410: {
      description: "Short URL has already been deleted",
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
}
