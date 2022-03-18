# Changelog

All notable changes to this project will be documented in this file

## [Unreleased]

## [1.0.0] - 2022-03-16

### Added

-   Auth. related endpoints (login, signup) and user model added.
-   Database connection added.

### Changed

-   Minor changes to the code in `index.ts` and `app.config.ts`.

### Removed

-   `MongoDB` dependency removed(using `mongoose`).

### Fixed

-   In `routes.ts`, assigned the correct controller to the correct end-point.

---

## [1.1.0] - 2022-03-19

### Added

-   CORS
-   JWT
-   RefreshToken model to save refresh tokens.
-   `refresh` _to generate access token_ and `logout` end points.
-   bycrypt to encrypt passwords.

### Changed

-   Related functions are grouped with classes. ex:- controllers
-   Some changes in code formatting.
-   Some minor changes.

### Removed

-   `bodyparser` removed from dependency. `express.json` used to parse request.

### Fixed

-   No fixes

---
