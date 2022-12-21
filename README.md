# First Bottle Remix (W.I.P)

A W.I.P app that'll provide a fresh and modern look to Offset's client facing sites using First Bottle as a prototype

## Purpose

Rewrite a big retail client (First Bottle) using Remix

What this is:

- A prototype of how a more modern tech stack can improve customer, developer, and, client experience
- An example of a different data structure for core domains
- An example of cursor pagination and pagination in general

What this isn't:

- A rewrite of the core API
- A production ready application

## Initial Roadmap

- [x] Migrate theme stylesheets from proprietary scss files into tailwind  
- [x] Create Navbar and Footer components 
- [x] Create base layout ui
- [x] Create dummy JSON files that consists of (This is for initial testing):
  - [x] First Bottle's products data using a different data structure
  - [x] Document data structure with defined types
- [x] Create global app provider
  - This'll be used for global states like client config, client CMS, etc.
- [x] Create home page
- [ ] Create product detail page
- [ ] Create wines page
- [ ] Create collections/samplers page
- [ ] Create session provider for cart and (in the future) auth info
  - This'll just be an simple in-memory store
