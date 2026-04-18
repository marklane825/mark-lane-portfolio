'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId: '34q5e37w',  
  dataset: 'production', 
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: '2024-01-01'}), // Hardcoded date to be safe
  ],
})