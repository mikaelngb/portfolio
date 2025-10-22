/**
 * JSON Schema Validator for Portfolio Content
 * Validates all JSON content files against expected schemas
 */

class PortfolioValidator {
  constructor() {
    this.schemas = {
      personalInfo: {
        required: ['name', 'title', 'email'],
        properties: {
          name: { type: 'string', minLength: 1, maxLength: 100 },
          title: { type: 'string', minLength: 1, maxLength: 200 },
          email: { type: 'string', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' },
          phone: { type: 'string', pattern: '^\\+?[\\d\\s\\-\\(\\)]+$', maxLength: 20 },
          location: { type: 'string', maxLength: 100 },
          summary: { type: 'string', maxLength: 500 },
          github: { type: 'string', pattern: '^https?://(www\\.)?github\\.com/.+' },
          linkedin: { type: 'string', pattern: '^https?://(www\\.)?linkedin\\.com/.+' },
          portfolio: { type: 'string', pattern: '^https?://.+' },
          socialLinks: {
            type: 'array',
            items: {
              type: 'object',
              required: ['platform', 'url'],
              properties: {
                platform: { type: 'string', enum: ['github', 'linkedin', 'website', 'twitter'] },
                url: { type: 'string', pattern: '^https?://.+' },
                username: { type: 'string', maxLength: 50 }
              }
            }
          }
        }
      },

      skills: {
        required: ['categories'],
        properties: {
          categories: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              required: ['name', 'skills'],
              properties: {
                name: { type: 'string', minLength: 1, maxLength: 100 },
                skills: {
                  type: 'array',
                  minItems: 1,
                  items: {
                    type: 'object',
                    required: ['name', 'level'],
                    properties: {
                      name: { type: 'string', minLength: 1, maxLength: 50 },
                      level: { type: 'number', minimum: 0, maximum: 100 }
                    }
                  }
                }
              }
            }
          }
        }
      },

      experience: {
        required: ['entries'],
        properties: {
          entries: {
            type: 'array',
            minItems: 0,
            items: {
              type: 'object',
              required: ['id', 'company', 'position', 'location', 'startDate', 'description'],
              properties: {
                id: { type: 'string', minLength: 1, maxLength: 50 },
                company: { type: 'string', minLength: 1, maxLength: 100 },
                position: { type: 'string', minLength: 1, maxLength: 100 },
                location: { type: 'string', minLength: 1, maxLength: 100 },
                startDate: { type: 'string', pattern: '^\\d{4}-\\d{2}$' },
                endDate: { type: 'string', pattern: '^\\d{4}-\\d{2}$|present' },
                current: { type: 'boolean' },
                description: { type: 'string', minLength: 10, maxLength: 1000 },
                responsibilities: {
                  type: 'array',
                  items: { type: 'string', minLength: 5, maxLength: 200 }
                },
                achievements: {
                  type: 'array',
                  items: { type: 'string', minLength: 5, maxLength: 200 }
                },
                technologies: {
                  type: 'array',
                  items: { type: 'string', minLength: 1, maxLength: 50 }
                }
              }
            }
          }
        }
      },

      projects: {
        required: ['projects'],
        properties: {
          projects: {
            type: 'array',
            minItems: 0,
            items: {
              type: 'object',
              required: ['id', 'title', 'briefDescription'],
              properties: {
                id: { type: 'string', minLength: 1, maxLength: 50 },
                title: { type: 'string', minLength: 1, maxLength: 200 },
                briefDescription: { type: 'string', minLength: 10, maxLength: 200 },
                detailedDescription: { type: 'string', maxLength: 2000 },
                technologies: {
                  type: 'array',
                  items: { type: 'string', minLength: 1, maxLength: 50 }
                },
                liveUrl: { type: 'string', pattern: '^https?://.+' },
                githubUrl: { type: 'string', pattern: '^https?://github\\.com/.+' },
                imageUrl: { type: 'string', maxLength: 200 },
                featured: { type: 'boolean' },
                completionDate: { type: 'string', pattern: '^\\d{4}-\\d{2}$' }
              }
            }
          }
        }
      },

      config: {
        required: ['site', 'navigation', 'contact'],
        properties: {
          site: {
            type: 'object',
            required: ['title', 'description', 'author', 'resumeUrl', 'theme', 'seo'],
            properties: {
              title: { type: 'string', minLength: 1, maxLength: 100 },
              description: { type: 'string', minLength: 10, maxLength: 200 },
              author: { type: 'string', minLength: 1, maxLength: 50 },
              resumeUrl: { type: 'string', pattern: '^/assets/.*\\.pdf$' },
              theme: {
                type: 'object',
                required: ['primaryColor', 'accentColor', 'backgroundColor', 'textColor']
              },
              seo: {
                type: 'object',
                required: ['keywords'],
                properties: {
                  keywords: { type: 'array', items: { type: 'string' } },
                  ogImage: { type: 'string', maxLength: 200 },
                  twitterHandle: { type: 'string', maxLength: 20 }
                }
              }
            }
          },
          navigation: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              required: ['name', 'href', 'icon'],
              properties: {
                name: { type: 'string', minLength: 1, maxLength: 50 },
                href: { type: 'string', pattern: '^#[a-zA-Z0-9-]+$' },
                icon: { type: 'string', maxLength: 20 }
              }
            }
          },
          contact: {
            type: 'object',
            required: ['email', 'socialLinks'],
            properties: {
              email: { type: 'string', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' },
              phone: { type: 'string', pattern: '^\\+?[\\d\\s\\-\\(\\)]+$' },
              showPhone: { type: 'boolean' },
              socialLinks: {
                type: 'array',
                minItems: 1,
                items: {
                  type: 'object',
                  required: ['platform', 'url'],
                  properties: {
                    platform: { type: 'string', enum: ['github', 'linkedin', 'website', 'twitter'] },
                    url: { type: 'string', pattern: '^https?://.+' },
                    username: { type: 'string', maxLength: 50 }
                  }
                }
              }
            }
          }
        }
      }
    };

    this.errors = [];
  }

  /**
   * Validate a JSON object against its schema
   */
  validate(data, schemaName) {
    const schema = this.schemas[schemaName];
    if (!schema) {
      throw new Error(`Schema '${schemaName}' not found`);
    }

    this.errors = [];
    this.validateRequired(data, schema, schemaName);
    this.validateProperties(data, schema, schemaName);
    this.validateTypes(data, schema, schemaName);

    return {
      valid: this.errors.length === 0,
      errors: this.errors
    };
  }

  /**
   * Validate required fields
   */
  validateRequired(data, schema, context) {
    if (schema.required) {
      schema.required.forEach(field => {
        if (!(field in data)) {
          this.errors.push(`${context}: Missing required field '${field}'`);
        }
      });
    }
  }

  /**
   * Validate object properties
   */
  validateProperties(data, schema, context) {
    if (schema.properties) {
      Object.keys(data).forEach(key => {
        if (!schema.properties[key]) {
          this.errors.push(`${context}: Unexpected property '${key}'`);
        }
      });
    }
  }

  /**
   * Validate data types and constraints
   */
  validateTypes(data, schema, context) {
    Object.keys(data).forEach(key => {
      const propertySchema = schema.properties[key];
      const value = data[key];

      if (!propertySchema) return;

      const { type, pattern, minLength, maxLength, minItems, maxItems, enum: enumValues, minimum, maximum } = propertySchema;

      // Type validation
      if (type === 'string') {
        if (typeof value !== 'string') {
          this.errors.push(`${context}.${key}: Expected string, got ${typeof value}`);
        } else {
          if (minLength && value.length < minLength) {
            this.errors.push(`${context}.${key}: Too short (minimum ${minLength} characters)`);
          }
          if (maxLength && value.length > maxLength) {
            this.errors.push(`${context}.${key}: Too long (maximum ${maxLength} characters)`);
          }
          if (pattern && !new RegExp(pattern).test(value)) {
            this.errors.push(`${context}.${key}: Invalid format`);
          }
        }
      } else if (type === 'number') {
        if (typeof value !== 'number') {
          this.errors.push(`${context}.${key}: Expected number, got ${typeof value}`);
        } else {
          if (minimum !== undefined && value < minimum) {
            this.errors.push(`${context}.${key}: Too small (minimum ${minimum})`);
          }
          if (maximum !== undefined && value > maximum) {
            this.errors.push(`${context}.${key}: Too large (maximum ${maximum})`);
          }
        }
      } else if (type === 'boolean') {
        if (typeof value !== 'boolean') {
          this.errors.push(`${context}.${key}: Expected boolean, got ${typeof value}`);
        }
      } else if (type === 'array') {
        if (!Array.isArray(value)) {
          this.errors.push(`${context}.${key}: Expected array, got ${typeof value}`);
        } else {
          if (minItems && value.length < minItems) {
            this.errors.push(`${context}.${key}: Too few items (minimum ${minItems})`);
          }
          if (maxItems && value.length > maxItems) {
            this.errors.push(`${context}.${key}: Too many items (maximum ${maxItems})`);
          }
        }
      } else if (type === 'object') {
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
          this.errors.push(`${context}.${key}: Expected object, got ${typeof value}`);
        }
      }

      // Enum validation
      if (enumValues && !enumValues.includes(value)) {
        this.errors.push(`${context}.${key}: Must be one of [${enumValues.join(', ')}]`);
      }
    });
  }

  /**
   * Validate all JSON content files
   */
  async validateAllFiles() {
    const files = [
      { name: 'personal-info.json', type: 'personalInfo' },
      { name: 'skills.json', type: 'skills' },
      { name: 'experience.json', type: 'experience' },
      { name: 'projects.json', type: 'projects' },
      { name: 'config.json', type: 'config' }
    ];

    const results = {};

    for (const file of files) {
      try {
        const response = await fetch(`data/${file.name}`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const validation = this.validate(data, file.type);

        results[file.name] = validation;

        if (!validation.valid) {
          // Validation failed silently
        }
      } catch (error) {
        results[file.name] = {
          valid: false,
          errors: [`Failed to load or parse file: ${error.message}`]
        };
        // Validation error handled silently
      }
    }

    return results;
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioValidator;
}